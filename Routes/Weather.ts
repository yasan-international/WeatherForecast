import { getForecast } from "../Controllers/Weather";
import { Methods, Route } from "../Helpers/types";
import { createRoutes } from "../Helpers/utility";
import { validateOrGuestLogin } from "../Middlewares/Auth";

export const baseUrl = "/weather";

const routes: Route[] = [
    // { method: Methods.GET, path: "/history", middlewares: [ validateOrGuestLogin ], action: getAllLocations },
    { method: Methods.GET, path: "/:locationId", middlewares: [ validateOrGuestLogin ], action: getForecast },
];

export const weatherRouter = createRoutes(routes);