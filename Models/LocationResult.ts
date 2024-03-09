import { QueryResult } from "../Helpers/types";

export type LocationPayload = {
    locationId: string
};

export type LocationResult = {
    Id: string,
    UserId: string,
    Name: string,
    Latitude: number,
    Longitude: number
};

export type LocationModel = {
    id: string,
    name?: string,
    userId: string,
    latitude?: number,
    longitude?: number
};

export const applyLocationModel = (result: QueryResult) => {
    return (result as LocationResult[]).map((data: LocationResult) => ({
        id: data.Id,
        name: data.Name,
        userId: data.UserId,
        latitude: data.Latitude,
        longitude: data.Longitude
    }));
};