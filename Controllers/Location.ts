import { otherCodes } from "../Helpers/error";
import { ActionContext, ControllerAction } from "../Helpers/types";
import { LocationModel, LocationPayload } from "../Models/LocationResult";
import { addUserLocation, deleteUserLocation, getLocationById, getUserLocations, updateUserLocation } from "../Services/Location";

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

        return await getLocationDetails(locationId, userId);
    }
    catch(error) {
        throw error;
    }
};

export const updateLocation: ControllerAction<LocationModel & LocationPayload, boolean> = async (context) => {
    try {
        const userId = getUserId(context);

        const locationId = context.params.locationId;

        const locationResult: LocationModel = await getLocationDetails(locationId, userId);

        if (!locationResult.userId || userId != locationResult.userId) {
            throw {
                code: otherCodes.USERMISMATCH,
                message: "Location requested for the wrong user"
            };
        }

        const updateRequest: LocationModel = {
            id: locationResult.id,
            userId: userId,
            name: context.params.name ?? locationResult.name,
            latitude: context.params.latitude ?? locationResult.latitude,
            longitude: context.params.longitude ?? locationResult.longitude
        }

        return await updateUserLocation(updateRequest, userId);
    }
    catch(error) {
        throw error;
    }
};

export const deleteLocation: ControllerAction<LocationModel & LocationPayload, boolean> = async (context) => {
    try {
        const userId = getUserId(context);

        const locationId = context.params.locationId;

        const result = await deleteUserLocation(locationId, userId);

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

const getLocationDetails = async (locationId: string, userId: string) => {
    const result = await getLocationById(locationId, userId);

    if (!result) {
        throw {
            code: otherCodes.NOTFOUND,
            message: `Location not found for user ${userId}`
        };
    }

    return result;
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