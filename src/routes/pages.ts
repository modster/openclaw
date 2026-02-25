import { Hono } from "hono";
import { homePage } from "../pages/home.ts";
import { tosPage } from "../pages/terms_of_service.ts";
import { privacyPage } from "../pages/privacy_policy.ts";

export const pagesRouter = new Hono();

pagesRouter.get("/", (c) => c.html(homePage()));
pagesRouter.get("/terms-of-service", (c) => c.html(tosPage()));
pagesRouter.get("/privacy-policy", (c) => c.html(privacyPage()));
