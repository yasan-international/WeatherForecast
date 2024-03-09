import { ResultSetHeader } from "mysql2";
import { applyLocationModel, LocationModel } from "../Models/LocationResult";
import { executeQuery } from "./Connection";

enum queries {
    GetAllLocations = "GetAllLocationsQuery.sql",
    GetLocationById = "GetLocationByIdQuery.sql"
};

enum commands {
    CreateLocation = "CreateLocationCommand.sql",
    UpdateLocation = "UpdateLocationCommand.sql",
    DeleteLocation = "DeleteLocationCommand.sql"
};

export const getUserLocations = async (userId: string) => {
    const variables: Map<string, string> = new Map<string, string>();
    variables.set("UserId", userId);

    const { data } = await executeQuery(queries.GetAllLocations, variables, false);

    return applyLocationModel(data) || [];
};

export const addUserLocation = async (location: LocationModel, userId: string) => {
    const variables: Map<string, string> = new Map<string, string>();
    variables.set("Id", location.id);
    variables.set("Name", location.name);
    variables.set("Latitude", location.latitude.toString());
    variables.set("Longitude", location.longitude.toString());
    variables.set("UserId", userId);

    const { data } = await executeQuery(commands.CreateLocation, variables, true);
    return (data as ResultSetHeader).affectedRows >= 1;
};