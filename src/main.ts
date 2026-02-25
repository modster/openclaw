import { load } from "@std/dotenv";
import { Hono } from "hono";
import { authRouter } from "./routes/auth.ts";
import { pagesRouter } from "./routes/pages.ts";
import { logger } from "hono/logger";

await load({
  envPath: ".env", // Load from .env.local for development
  export: true, // optional: export loaded variables for Deno.env, process.env, etc.
});

const { PORT } = Deno.env.toObject();

const app = new Hono();

app.use("*", logger());
app.route("/auth", authRouter);
app.route("/", pagesRouter);

Deno.serve({ port: PORT ? Number(PORT) : 8000 }, app.fetch);
