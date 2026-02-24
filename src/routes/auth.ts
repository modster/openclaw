import { Hono } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";

export const authRouter = new Hono();

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

function getRequiredEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function getRedirectUri(): string {
  const base = Deno.env.get("APP_BASE_URL") ?? "http://localhost:8000";
  return `${base}/auth/callback`;
}

/** Returns true when the app is running over HTTPS (i.e. in production). */
function isSecureContext(): boolean {
  const base = Deno.env.get("APP_BASE_URL") ?? "http://localhost:8000";
  return base.startsWith("https://");
}

/** Sign `payload` with `secret` using HMAC-SHA-256 and return "<payload>.<signature>". */
async function signPayload(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return `${payload}.${sigB64}`;
}

/** Verify a signed value produced by `signPayload`. Returns the payload on success, null on failure. */
async function verifyPayload(signed: string, secret: string): Promise<string | null> {
  const dotIdx = signed.lastIndexOf(".");
  if (dotIdx === -1) return null;
  const payload = signed.slice(0, dotIdx);
  const expected = await signPayload(payload, secret);
  return expected === signed ? payload : null;
}

/** Step 1 – redirect the user to Google's OAuth consent screen. */
authRouter.get("/login", async (c) => {
  let clientId: string;
  try {
    clientId = getRequiredEnv("GOOGLE_CLIENT_ID");
  } catch {
    return c.text("OAuth is not configured. Set GOOGLE_CLIENT_ID in your environment.", 503);
  }

  const csrfState = crypto.randomUUID();
  const sessionSecret = Deno.env.get("SESSION_SECRET") ?? "";
  const signedCsrfState = await signPayload(csrfState, sessionSecret);

  setCookie(c, "oauth_state", signedCsrfState, {
    httpOnly: true,
    secure: isSecureContext(),
    sameSite: "Lax",
    path: "/",
    maxAge: 600,
  });

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getRedirectUri(),
    response_type: "code",
    scope: "openid email profile",
    state: csrfState,
    access_type: "online",
    prompt: "select_account",
  });

  return c.redirect(`${GOOGLE_AUTH_URL}?${params}`);
});

/** Step 2 – Google redirects back here with an authorization code. */
authRouter.get("/callback", async (c) => {
  const { code, state: csrfState, error } = c.req.query();

  if (error) {
    return c.text(`OAuth error: ${error}`, 400);
  }

  const sessionSecret = Deno.env.get("SESSION_SECRET") ?? "";
  const signedCsrfState = getCookie(c, "oauth_state");
  deleteCookie(c, "oauth_state", { path: "/" });

  if (!signedCsrfState) {
    return c.text("Invalid OAuth state parameter.", 400);
  }
  const verifiedState = await verifyPayload(signedCsrfState, sessionSecret);
  if (!verifiedState || verifiedState !== csrfState) {
    return c.text("Invalid OAuth state parameter.", 400);
  }

  const clientId = getRequiredEnv("GOOGLE_CLIENT_ID");
  const clientSecret = getRequiredEnv("GOOGLE_CLIENT_SECRET");

  // Exchange the authorization code for tokens.
  const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: getRedirectUri(),
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    return c.text("Failed to exchange authorization code for tokens.", 500);
  }

  const tokens = await tokenRes.json() as { access_token: string };

  // Fetch the authenticated user's profile.
  const userRes = await fetch(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });

  if (!userRes.ok) {
    return c.text("Failed to fetch user info.", 500);
  }

  const user = await userRes.json() as { name: string; email: string; picture: string };

  // Build a signed session cookie so the payload cannot be tampered with.
  const payload = btoa(JSON.stringify({ name: user.name, email: user.email, picture: user.picture }));
  const signedSession = await signPayload(payload, sessionSecret);

  setCookie(c, "session", signedSession, {
    httpOnly: true,
    secure: isSecureContext(),
    sameSite: "Lax",
    path: "/",
    maxAge: 86400,
  });

  return c.redirect("/");
});

/** Clear the session and redirect home. */
authRouter.get("/logout", (c) => {
  deleteCookie(c, "session", { path: "/" });
  return c.redirect("/");
});
