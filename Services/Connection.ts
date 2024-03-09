import { getQuery } from "../Helpers/sql";
import { createPool } from "mysql2";

const readPool = createPool({
    database: process.env.READ_DB_NAME,
    user: process.env.READ_DB_USER,
    password: process.env.READ_DB_PASSWORD,
    host: process.env.READ_DB_HOST,
    port: +process.env.READ_DB_PORT
});

const writePool = createPool({
    database: process.env.WRITE_DB_NAME,
    user: process.env.WRITE_DB_USER,
    password: process.env.WRITE_DB_PASSWORD,
    host: process.env.WRITE_DB_HOST,
    port: +process.env.WRITE_DB_PORT
});

export const executeQuery = async (queryName: string, variables: Map<string, any>, 
    isCommand: boolean) => {
    const query = await getQuery(queryName, variables);

    const connection = await getConnection(isCommand);
    try {
        const [data, fields] = await connection.query(query);

        return {
            data,
            fields
        };
    }
    catch(error) {
        console.error(`Failed to execute ${isCommand ? "command" : "query"} 
            ${queryName}: ${query}`);
        throw error;
        /* TODO:
            "error": {
            "message": "Unknown column 'UserId' in 'field list'",
            "code": "ER_BAD_FIELD_ERROR",
            "errno": 1054,
            "sql": "INSERT INTO Users (`Id`, `UserId`, `Name`, `Latitude`, `Longitude`) VALUES (NULL, '3dcb9c8e-55ac-4deb-9e46-16f622237b94', 'Prabhadevi', '19.0176837', '72.8281276');",
            "sqlState": "42S22",
            "sqlMessage": "Unknown column 'UserId' in 'field list'"
            }
        */
    }
    finally {
        connection.release();
    }
};

const getConnection = (isCommand: boolean) => {
    if (isCommand) {
        return writePool.promise().getConnection();
    }
    else {
        return readPool.promise().getConnection();
    }
};