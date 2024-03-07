import { healthCheck } from "../Controllers/healthCheck";
import { Methods, Route } from "../Helpers/types";
import { createRoutes } from "../Helpers/utility";

export const baseUrl = "/healthCheck";

const routes: Route[] = [
    { method: Methods.GET, path: "/", action: healthCheck, middlewares: [] }
];

export const healthCheckRouter = createRoutes(routes);