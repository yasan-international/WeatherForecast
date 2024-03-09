import { LocationModel } from "../Models/LocationResult";
import moment from "moment";
import { externalGetApi } from "./External";
import { ForecastResult } from "Models/WeatherResult";

export const getLocationForecast = async (location: LocationModel) => {
    const params = `forecast.json?key=${process.env.WEATHER_API_KEY}
        &q=${location.latitude},${location.longitude}&days=1
        &dt=${moment().format("yyyy-MM-DD")}`;

    const result: ForecastResult = await externalGetApi(`${process.env.WEATHER_API_BASE_URL}/${params}`);

    console.log(result.forecast.forecastday[0].date + " " + result.location.country);

    return result;
};