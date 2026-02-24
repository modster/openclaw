import { Hono } from "hono";
import { homePage } from "../pages/home.ts";
import { tosPage } from "../pages/tos.ts";
import { privacyPage } from "../pages/privacy.ts";

export const pagesRouter = new Hono();

pagesRouter.get("/", (c) => c.html(homePage()));
pagesRouter.get("/terms", (c) => c.html(tosPage()));
pagesRouter.get("/privacy", (c) => c.html(privacyPage()));
