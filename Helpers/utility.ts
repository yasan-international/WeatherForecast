import { Router } from "express";
import { controllerActionMW } from "../Middlewares/Controller";
import { Methods, Route } from "./types";

export const createRoutes = (routes: Route[]) => {
    const router = Router();

    routes.forEach((route) => {
        if (route.action && typeof route.action === 'function') {
            switch(route.method) {
                case Methods.GET:
                    router.get(route.path, route.middlewares ?? [], controllerActionMW(route.action));
                    break;
                case Methods.POST:
                    router.post(route.path, route.middlewares ?? [], controllerActionMW(route.action));
                    break;
                case Methods.PUT:
                    router.put(route.path, route.middlewares ?? [], controllerActionMW(route.action));
                    break;
                case Methods.DELETE:
                    router.delete(route.path, route.middlewares ?? [], controllerActionMW(route.action));
                    break;
                default:
                    throw Error(`Invalid method: ${route.method} for path: ${route.path}`);
            }
        }
        else {
            throw Error(`Invalid action: ${route.action} for path: ${route.path}`);
        }
    });

    return router;
}