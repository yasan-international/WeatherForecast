import { statusCode } from "./response";
import { sqlCodes } from "./sql";
import { ErrorPayload, ErrorResponse } from "./types";

export const errorHandler = (error: ErrorPayload) => {
    var errorResponse: ErrorResponse = {
        statusCode: statusCode.internalServerError,
        message: error.message || "Internal Server Error"
    };

    if (error.code) {
        switch(error.code) {
            case sqlCodes.DUPLICATE:
                errorResponse.statusCode = statusCode.duplicate;
                errorResponse.message = "Duplicate Entry";
                break;
            case sqlCodes.BADFIELD:
            case sqlCodes.INVALIDVALUE:
                errorResponse.statusCode = statusCode.badRequest;
                errorResponse.message = error.sqlMessage ?? error.message;
                break;
            default: 
                errorResponse.statusCode = statusCode.internalServerError;
                errorResponse.message = error.sqlMessage ?? error.message;
        }
    }

    return errorResponse;
};