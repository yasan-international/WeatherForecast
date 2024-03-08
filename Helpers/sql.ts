import fs from "fs/promises";

export const getQuery = async (queryName: string, variables: Map<string, any>[]) => {
    try {
        const queryBuffer = await fs.readFile(`../Database/${queryName}`);
        const queryString = queryBuffer.toString();

        if (variables) {
            Object.keys(variables).map((variableName, index) => {
                queryString.replace(`@${variableName}`, variables[index].toString());
            });
        }        

        return queryString;
    }
    catch(error) {
        console.error(`Failed to read query file: ${queryName}`);
        throw error;
    }
}