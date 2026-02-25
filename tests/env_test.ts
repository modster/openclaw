import { load } from "@std/dotenv"; // import "@std/dotenv/load";
import { assertEquals } from "@std/assert";

await load({
  envPath: ".env", // Load from .env for testing
  export: true, // optional: export loaded variables for Deno.env, process.env, etc.
});

assertEquals(Deno.env.get("PORT"), "3000");
assertEquals(Deno.env.get("DEV_BASE_URL"), "http://localhost:3000");
assertEquals(Deno.env.get("APP_BASE_URL"), "https://openclaw.greeffer.com");
