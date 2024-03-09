import { otherCodes } from "../Helpers/error";
import { ActionContext, ControllerAction } from "../Helpers/types";
import { LocationModel, LocationPayload } from "../Models/LocationResult";
import { addUserLocation, getLocationById, getUserLocations } from "../Services/Location";

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

export const getLocation: ControllerAction<LocationPayload, LocationModel> = async (context) => {
    try {
        const userId = getUserId(context);

        const locationId = context.params.locationId;

        const result = await getLocationById(locationId, userId);

        if (!result) {
            throw {
                code: otherCodes.NOTFOUND,
                message: `Location not found for user ${userId}`
            };
        }

        return result;
    }
    catch(error) {
        throw error;
    }
};

const getUserId = (context: ActionContext<any>) => {
    if (!context.user.id) {
        throw {
            code: otherCodes.BADAUTHREQUEST,
            message: "Bad Authorization Request"
        };
    }

    return context.user.id;
};