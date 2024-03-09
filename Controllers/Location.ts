import { ActionContext, ControllerAction } from "../Helpers/types";
import { LocationModel } from "../Models/LocationResult";
import { addUserLocation, getUserLocations } from "../Services/Location";

export const getAllLocations: ControllerAction<void, LocationModel[]> = async (context) => {
    try {
        const userId = getUserId(context);

        return await getUserLocations(userId);
    }
    catch(error) {
        throw error;
    }
};

export const addLocation: ControllerAction<LocationModel, boolean> = async (context) => {
    try {
        const userId = getUserId(context);

        return await addUserLocation(context.params, userId);
    }
    catch(error) {
        throw error;
    }
};

const getUserId = (context: ActionContext<any>) => {
    if (!context.user.id) {
        throw Error(`Invalid User Id`);
    }

    return context.user.id;
};