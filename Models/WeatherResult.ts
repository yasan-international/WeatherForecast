import { LocationPayload } from "./LocationResult";

export type HistoryPayload = LocationPayload & {
    days: number
};

export type ForecastResult = {
    location: LocationSubResult,
    forecast: ForecastSubResult,
};

export type ForecastModel = {
    locationName: string,
    region: string,
    country: string,
    latitude: number,
    longitude: number,
    localTime: Date,
    day: DaySubModel[]
};

type LocationSubResult = {
    name: string,
    region: string
    country: string,
    lat: number,
    long: number,
    localtime: Date
};

type ForecastSubResult = {
    forecastday: ForecastDayResult[]
};

type ForecastDayResult = {
    date: Date,
    day: DaySubResult,
    astro: AstroSubResult,
    hour: HourSubResult[]
};

type DaySubResult = {
    maxtemp_c: string,
    maxtemp_f: string,
    mintemp_c: string,
    mintemp_f: string,
    condition: ConditionSubSubResult
};

type ConditionSubSubResult = {
    text: string,
    icon: string,
    code: string
};

type AstroSubResult = {
    sunrise: string,
    sunset: string,
    moonrise: string,
    moonset: string,
    moon_phase: string
};

type HourSubResult = {
    time: Date,
    temp_c: string,
    temp_f: string,
    is_day: boolean,
    humidity: number,
    feelslike_c: number,
    feelslike_f: number,
    condition: ConditionSubSubResult
};

type HourSubModel = {
    time: Date,
    tempC: string,
    tempF: string,
    isDay: boolean,
    humidity: number,
    feelsLikeC: number,
    feelsLikeF: number,
    condition: ConditionSubSubResult
};

type DaySubModel = {
    maxTempC: string,
    maxTempF: string,
    minTempC: string,
    minTempF: string,
    astro: AstroSubModel,
    hour: HourSubModel[],
    condition: ConditionSubSubResult
};

type AstroSubModel = {
    sunrise: string,
    sunset: string,
    moonRise: string,
    moonSet: string,
    moonPhase: string
};

const applyHourModel = (result: HourSubResult[]) => {
    return result.map((data: HourSubResult) => ({
        time: data.time,
        tempC: data.temp_c,
        tempF: data.temp_f,
        isDay: data.is_day,
        humidity: data.humidity,
        feelsLikeC: data.feelslike_c,
        feelsLikeF: data.feelslike_f,
        condition: data.condition
    }));
};

const applyDayModel = (result: ForecastDayResult[]) => {
    return result.map((data: ForecastDayResult) => ({
        maxTempC: data.day.maxtemp_c,
        maxTempF: data.day.maxtemp_f,
        minTempC: data.day.mintemp_c,
        minTempF: data.day.mintemp_f,
        astro: applyAstroModel(data),
        hour: applyHourModel(data.hour),
        condition: data.day.condition
    }));
};

const applyAstroModel = (result: ForecastDayResult) => {
    return {
        sunrise: result.astro.sunrise,
        sunset: result.astro.sunset,
        moonRise: result.astro.moonrise,
        moonSet: result.astro.moonset,
        moonPhase: result.astro.moon_phase
    };
};

export const applyForecastResultModel = (result: ForecastResult) => {
    const forecastModel: ForecastModel = {
        locationName: result.location.name,
        region: result.location.region,
        country: result.location.country,
        latitude: result.location.lat,
        longitude: result.location.long,
        localTime: result.location.localtime,
        day: applyDayModel(result.forecast.forecastday),
    };

    return forecastModel;
};