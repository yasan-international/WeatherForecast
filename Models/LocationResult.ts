import { QueryResult } from "../Helpers/types";

export type LocationResult = {
    Id: string,
    Name: string,
    Latitude: number,
    Longitude: number
};

export type LocationModel = {
    id: string,
    name: string,
    latitude: number,
    longitude: number
};

export const applyLocationModel = (result: QueryResult) => {
    return (result as LocationResult[]).map((data: LocationResult) => ({
        id: data.Id,
        name: data.Name,
        latitude: data.Latitude,
        longitude: data.Longitude
    }));
};