import { addLocation, deleteLocation, getAllLocations, getLocation, updateLocation } from "../Controllers/Location";
import { Methods, Route } from "../Helpers/types";
import { createRoutes } from "../Helpers/utility";
import { validateOrGuestLogin } from "../Middlewares/Auth";

export const baseUrl = "/locations";

const routes: Route[] = [
    { method: Methods.GET, path: "/", middlewares: [ validateOrGuestLogin ], action: getAllLocations },
    { method: Methods.GET, path: "/:locationId", middlewares: [ validateOrGuestLogin ], action: getLocation },
    { method: Methods.POST, path: "/", middlewares: [ validateOrGuestLogin ], action: addLocation },
    { method: Methods.PUT, path: "/:locationId", middlewares: [ validateOrGuestLogin ], action: updateLocation },
    { method: Methods.DELETE, path: "/:locationId", middlewares: [ validateOrGuestLogin ], action: deleteLocation },
];

export const locationRouter = createRoutes(routes);