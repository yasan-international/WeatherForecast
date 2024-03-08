import { getQuery } from "Helpers/sql";
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

export const executeQuery = async (queryName: string, variables: Map<string, any>[], 
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
        console.error(`Failed to execute ${isCommand ? "command" : "query"}: 
            ${queryName}`);
        throw error;
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