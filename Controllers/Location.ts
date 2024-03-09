import { getUserId } from "../Middlewares/Controller";
import { otherCodes } from "../Helpers/error";
import { ControllerAction } from "../Helpers/types";
import { LocationModel, LocationPayload } from "../Models/LocationResult";
import { addUserLocation, deleteUserLocation, getLocationById, getUserLocations, updateUserLocation } from "../Services/Location";
import { validateSchema } from "../Middlewares/Validation";

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

        // If error is not thrown then we just move on
        validateSchema([            
            { key: "userId", type: "string" },
            { key: "name", type: "string" },
            { key: "latitude", type: "number" },
            { key: "longitude", type: "number" }
        ], context.params);

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

        return await getLocationDetails(locationId.toString(), userId);
    }
    catch(error) {
        throw error;
    }
};

export const updateLocation: ControllerAction<LocationModel & LocationPayload, boolean> = async (context) => {
    try {
        const userId = getUserId(context);
        const locationId = context.params.locationId;

        validateSchema([
            { key: "id", type: "number" }
        ], context.params);

        const locationResult: LocationModel = await getLocationDetails(locationId.toString(), userId);

        if (!locationResult || !locationResult.userId || userId != locationResult.userId) {
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
        };

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

        validateSchema([
            { key: "id", type: "number" }
        ], context.params);

        const result = await deleteUserLocation(locationId.toString(), userId);

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

export const getLocationDetails = async (locationId: string, userId: string) => {
    const result = await getLocationById(locationId, userId);

    if (!result) {
        throw {
            code: otherCodes.NOTFOUND,
            message: `Location not found for user ${userId}`
        };
    }

    return result;
};