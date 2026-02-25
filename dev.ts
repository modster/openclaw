import { load } from "@std/dotenv";
import { Hono } from "hono";

await load({
  envPath: ".env.local", // Load from .env.local for development
  export: true, // optional: export loaded variables for Deno.env, process.env, etc.
});

const { PROD, PORT, APP_BASE_URL } = Deno.env.toObject();

if (PROD) {
  console.warn("Warning: Loaded PROD Environment.");
  console.warn(`PROD: "${PROD}"`);
  throw new Error(
    "PROD environment variable is set. Please unset it for development.",
  );
} else {
  console.log("Loaded DEV Environment");
}

// export const app = new Hono();

// export const devConfig = {
//   PROD,
//   APP_BASE_URL,
//   PORT,
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   SESSION_SECRET,
//   GOOGLE_AUTH_URL,
//   GOOGLE_TOKEN_URL,
//   GOOGLE_USERINFO_URL,
// };
