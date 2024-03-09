import { addLocation, getAllLocations } from "../Controllers/Location";
import { Methods, Route } from "../Helpers/types";
import { createRoutes } from "../Helpers/utility";
import { validateOrGuestLogin } from "../Middlewares/Auth";

export const baseUrl = "/locations";

const routes: Route[] = [
    { method: Methods.GET, path: "/", middlewares: [ validateOrGuestLogin ], action: getAllLocations },
    // { method: Methods.GET, path: "/:locationId", middlewares: [ validateOrGuestLogin ], action:  },
    { method: Methods.POST, path: "/", middlewares: [ validateOrGuestLogin ], action: addLocation },
    // { method: Methods.PUT, path: "/:locationId", middlewares: [ validateOrGuestLogin ], action:  },
    // { method: Methods.DELETE, path: "/:locationId", middlewares: [ validateOrGuestLogin ], action:  },
];

export const locationRouter = createRoutes(routes);