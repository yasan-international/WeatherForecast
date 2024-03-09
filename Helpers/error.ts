import { statusCode } from "./response";
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
            case otherCodes.BADAUTHREQUEST:
            case otherCodes.USERMISMATCH:
                errorResponse.statusCode = statusCode.badRequest;
                errorResponse.message = error.sqlMessage ?? error.message;
                break;
            case otherCodes.NOTFOUND:
                errorResponse.statusCode = statusCode.notFound;
                errorResponse.message = error.message;
                break;
            default: 
                errorResponse.statusCode = statusCode.internalServerError;
                errorResponse.message = error.sqlMessage ?? error.message;
        }
    }

    return errorResponse;
};

export enum sqlCodes {
    DUPLICATE = "ER_DUP_ENTRY",
    BADFIELD = "ER_BAD_FIELD_ERROR",
    INVALIDVALUE = "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD"
};

export enum otherCodes {
    BADAUTHREQUEST = "BAD_USERID_ERROR",
    USERMISMATCH = "USER_MISMATCH_ERROR",
    NOTFOUND = "NOT_FOUND_ERROR"
};