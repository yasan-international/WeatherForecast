import axios from "axios";
import { handleServiceResponseErrors, statusCode } from "../Helpers/response";

export const externalGetApi = async (url: string) => {
    const response = await axios.get(url);
    if (!response || response.status != statusCode.success) {
        throw {
            message: handleServiceResponseErrors(url, response.status)
        };
    }

    return response.data;
};