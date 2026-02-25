import { load } from "@std/dotenv";
import { strict as assert } from "node:assert";
import { Hono } from "hono";
import { pagesRouter } from "../src/routes/pages.ts";
import { authRouter } from "../src/routes/auth.ts";

await load({
  envPath: ".env",
  export: true,
});

const app = new Hono();
app.route("/auth", authRouter);
app.route("/", pagesRouter);

Deno.test("GET / returns 200 with homepage HTML", async () => {
  const res = await app.request("/");
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.ok(html.includes("Welcome to openclaw"), "missing heading");
  assert.ok(html.includes("Sign in with Google"), "missing CTA");
});

Deno.test("GET /terms returns 200 with Terms of Service HTML", async () => {
  const res = await app.request("/terms");
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.ok(html.includes("Terms of Service"), "missing title");
  assert.ok(html.includes("Acceptance of Terms"), "missing section");
});

Deno.test("GET /privacy returns 200 with Privacy Policy HTML", async () => {
  const res = await app.request("/privacy");
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.ok(html.includes("Privacy Policy"), "missing title");
  assert.ok(html.includes("Information We Collect"), "missing section");
});

Deno.test("GET /auth/login returns 503 when GOOGLE_CLIENT_ID is not set", async () => {
  const saved = Deno.env.get("GOOGLE_CLIENT_ID");
  if (saved) Deno.env.delete("GOOGLE_CLIENT_ID");

  const res = await app.request("/auth/login");
  assert.equal(res.status, 503);

  if (saved) Deno.env.set("GOOGLE_CLIENT_ID", saved);
});

Deno.test("GET /auth/callback returns 400 when state is missing", async () => {
  const res = await app.request("/auth/callback?code=abc");
  assert.equal(res.status, 400);
});

Deno.test("GET /auth/logout redirects to /", async () => {
  const res = await app.request("/auth/logout");
  assert.equal(res.status, 302);
  assert.equal(res.headers.get("location"), "/");
});
