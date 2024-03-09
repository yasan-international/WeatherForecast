import { applyUserModel } from "../Models/UserResult";
import { ResultSetHeader } from "mysql2";
import { executeQuery } from "./Connection";

enum queries {
    GetUserQuery = "GetUserQuery.sql"
};

enum commands {
    CreateUserCommand = "CreateUserCommand.sql"
}

export const getUserDetails = async (userId: string) => {
    var variables: Map<string, string> = new Map<string, string>();
    variables.set("UserId", userId);

    try {
        const { data } = await executeQuery(queries.GetUserQuery, variables, false);
        return applyUserModel(data)[0] || null;
    }
    catch(error) {
        console.error(`User Details Query Failed: ${error.message}`);
    }
};

export const createUser = async (userId: string, isGuest: number, contact: string) => {
    var variables: Map<string, string> = new Map<string, string>();
    variables.set("UserId", userId);
    variables.set("IsGuest", isGuest.toString());
    variables.set("Contact", contact);

    try {
        const { data } = await executeQuery(commands.CreateUserCommand, variables, true);
        return (data as ResultSetHeader).affectedRows >= 1;
    }
    catch(error) {
        console.error(`User Details Query Failed: ${error.message}`);
    }
};