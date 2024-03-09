import { otherCodes } from "../Helpers/error";
import { ControllerAction } from "../Helpers/types";
import { getUserId } from "../Middlewares/Controller";
import { LocationModel, LocationPayload } from "../Models/LocationResult";
import { getLocationForecast } from "../Services/Weather";
import { getLocationDetails } from "./Location";

export const getForecast: ControllerAction<LocationPayload, any> = async (context) => {
    try {
        const locationId = context.params.locationId;
        const userId = getUserId(context);

        const locationResult = await getLocationDetails(locationId, userId);

        if (!locationResult || !locationResult.userId || userId != locationResult.userId) {
            throw {
                code: otherCodes.USERMISMATCH,
                message: "Location requested for the wrong user"
            };
        }

        return await getLocationForecast(locationResult);
    }
    catch(error) {
        throw error;
    }
};