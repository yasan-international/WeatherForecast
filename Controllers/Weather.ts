import { validateSchema } from "../Middlewares/Validation";
import { ForecastModel, HistoryPayload } from "../Models/WeatherResult";
import { otherCodes } from "../Helpers/error";
import { ControllerAction } from "../Helpers/types";
import { getUserId } from "../Middlewares/Controller";
import { LocationPayload } from "../Models/LocationResult";
import { getLocationForecast, getLocationHistory } from "../Services/Weather";
import { getLocationDetails } from "./Location";

export const getForecast: ControllerAction<LocationPayload, ForecastModel> = async (context) => {
    try {
        const locationId = context.params.locationId;
        const userId = getUserId(context);

        const locationResult = await getLocationDetails(locationId.toString(), userId);

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

export const getHistory: ControllerAction<HistoryPayload, ForecastModel> = async (context) => {
    try {
        const locationId = context.params.locationId;
        const userId = getUserId(context);
        const days = dayCount[context.params.days];

        validateSchema([
            { key: "days", type: "number" },
            { key: "locationId", type: "number" }
        ], context.params);

        const locationResult = await getLocationDetails(locationId.toString(), userId);

        if (!locationResult || !locationResult.userId || userId != locationResult.userId) {
            throw {
                code: otherCodes.USERMISMATCH,
                message: "Location requested for the wrong user"
            };
        }

        return await getLocationHistory(locationResult, days);
    }
    catch(error) {
        throw error;
    }
};

const dayCount = [
    7,
    15,
    30
];