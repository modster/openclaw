import { load } from "@std/dotenv"; // import "@std/dotenv/load";
import { parse, stringify } from "@std/dotenv";
import { assertEquals } from "@std/assert";

const localEnv = await load({
  envPath: ".env.local", // Load from .env.local for development
  export: false, // optional: export loaded variables for Deno.env, process.env, etc.
});

// const env = Deno.env.toObject();
const prodEnv = await load({
  envPath: ".env.prod", // Load from .env.prod for production
  export: false, // optional: export loaded variables for Deno.env, process.env, etc.
});

const envEnv = await load({
  envPath: ".env", // Load from .env for testing
  export: false, // optional: export loaded variables for Deno.env, process.env, etc.
});



assertEquals(localEnv.PROD, "false");
assertEquals(localEnv.PORT, "3000");
assertEquals(localEnv.APP_BASE_URL, "http://localhost:3000");

assertEquals(prodEnv.PROD, "true");
assertEquals(prodEnv.PORT, "3000");
assertEquals(prodEnv.APP_BASE_URL, "https://openclaw.greeffer.com");

assertEquals(envEnv.PROD, "Env loaded successfully...");
assertEquals(envEnv.PORT, "3000");
assertEquals(envEnv.APP_BASE_URL, "http://localhost:3000");
// assertEquals(parse(''), {
//   GREETING: "Env loaded successfully...",
// });
// assertEquals(
//   stringify({ PROD, PORT, APP_BASE_URL }, {  }),
//   "PROD='Env loaded successfully...'",
// );
