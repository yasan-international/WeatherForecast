export type ForecastResult = {
    location: LocationSubResult,
    forecast: ForecastSubResult
};

export type ForecastModel = {
    location: LocationSubResult,
    forecast: ForecastSubModel
};

type LocationSubResult = {
    name: string,
    region: string
    country: string,
    lat: number,
    long: number
};

type ForecastSubResult = {
    forecastday: ForecastDayResult[]
};

export type ForecastSubModel = {
    forecastDay: ForecastDayModel[]
};

type ForecastDayResult = {
    date: Date,
    day: DaySubResult,
    astro: AstroSubResult,
    hour: HourSubResult[]
};

export type ForecastDayModel = {
    date: Date,
    day: DaySubModel,
    astro: AstroSubModel,
    hour: HourSubModel[]
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
    condition: ConditionSubSubResult
};

type AstroSubModel = {
    sunrise: string,
    sunset: string,
    moonRise: string,
    moonSet: string,
    moonPhase: string
};

export const applyHourModel = (result: HourSubResult[]) => {
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

export const applyForecastModel = (result: ForecastSubResult[]) => {
    return result.map((data: ForecastSubResult) => ({
        forecastDay: data.forecastday
    }));
};