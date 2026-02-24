import { Hono } from "hono";
import { logger } from "hono/logger";
import { pagesRouter } from "./routes/pages.ts";
import { authRouter } from "./routes/auth.ts";

const app = new Hono();

app.use("*", logger());

app.route("/auth", authRouter);
app.route("/", pagesRouter);

const port = Number(Deno.env.get("PORT") ?? 8000);
console.log(`openclaw listening on http://localhost:${port}`);

Deno.serve({ port }, app.fetch);
