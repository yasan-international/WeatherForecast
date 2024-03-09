import fs from "fs/promises";

export const getQuery = async (queryName: string, variables: Map<string, string>) => {
    try {
        const queryBuffer = await fs.readFile(`dist/Database/${queryName}`);
        var queryString = queryBuffer.toString();

        if (variables) {
            variables.forEach((value: string, name: string) => {
                queryString = queryString.replace(`@${name}`, value ? `\'${value}\'` : "NULL");
            });
        }

        return queryString;
    }
    catch(error) {
        console.error(`Failed to read query file: ${queryName}`);
        throw error;
    }
};

export enum sqlCodes {
    DUPLICATE = "ER_DUP_ENTRY",
    BADFIELD = "ER_BAD_FIELD_ERROR",
    INVALIDVALUE = "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD"
};