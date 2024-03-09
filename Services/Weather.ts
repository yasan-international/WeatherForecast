import { LocationModel } from "../Models/LocationResult";
import moment from "moment";
import { externalGetApi } from "./External";
import { applyForecastResultModel, ForecastModel, ForecastResult } from "../Models/WeatherResult";
import client from "../Helpers/cache";

const getForecastCacheKey = (latitude: string, longitude: string) => {
    return `L${parseFloat(latitude).toFixed(2)}L${parseFloat(longitude).toFixed(2)}`
};

export const getLocationForecast = async (location: LocationModel) => {
    try {
        var result: ForecastModel = await checkCacheForForecast(location);

        if (result) {
            return result;
        }
        
        const params = `forecast.json?key=${process.env.WEATHER_API_KEY}
            &q=${location.latitude},${location.longitude}&days=1
            &dt=${moment().format("yyyy-MM-DD")}`;

        const data = await externalGetApi(`${process.env.WEATHER_API_BASE_URL}/${params}`);
        result = applyForecastResultModel(data);

        client.setEx(getForecastCacheKey(location.latitude.toString(), location.longitude.toString()), 
            60*60, JSON.stringify(result));

        return result;
    }
    catch(error) {
        throw error;
    }
    finally {
        client.quit();
    }
};

export const getLocationHistory = async (location: LocationModel, days: number) => {
    try {
        const params = `history.json?key=${process.env.WEATHER_API_KEY}
            &q=${location.latitude},${location.longitude}&days=${days}
            &dt=${moment().subtract(days, "days").format("yyyy-MM-DD")}`;

        const result: ForecastResult = await externalGetApi(`${process.env.WEATHER_API_BASE_URL}/${params}`);

        return applyForecastResultModel(result);
    }
    catch(error) {
        throw error;
    }
};

const checkCacheForForecast = async (location: LocationModel) => {
    await client.connect();
    console.log(`Opened connection with Redis Client`);

    return client.get(getForecastCacheKey(location.latitude.toString(), location.longitude.toString()), 
        async (forecast: string) => {
            if (forecast) {
                return JSON.parse(forecast);
            }

            return null;
        }
    );
};