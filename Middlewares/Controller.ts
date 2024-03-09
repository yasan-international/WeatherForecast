import { ActionContext, ControllerAction, Middleware } from "../Helpers/types";
import { NextFunction, Request, Response } from "express";
import { statusCode } from "../Helpers/response";
import { errorHandler, otherCodes } from "../Helpers/error";

export const controllerActionMW = (controller: ControllerAction<any, any>): Middleware => 
    async (request: Request, response: Response, next: NextFunction) => {
        const context: ActionContext<any> = {
            params: {
                ...request.params,
                ...request.query,
                ...request.body
            },
            user: response.locals.user
        };

        console.log(`Request Received: ${request.baseUrl}${request.path}`);

        try {
            const data = await controller(context);

            response.locals.data = data;
            response.locals.statusCode = statusCode.success;
        }
        catch(error) {
            const errorResponse = errorHandler(error);

            response.locals.message = errorResponse.message;
            response.locals.statusCode = errorResponse.statusCode;
            response.locals.error = error;
            response.locals.data = error.data;

            console.log(errorResponse.message);
        }
        finally {
            console.log(`Request ${response.locals.error ? "Failed" : "Successful"}: ${request.baseUrl}${request.path}`);

            // User is mainly for guest login, not needed if login with jwt is used.
            response.send({
                data: response.locals.data,
                user: response.locals.user,
                error: response.locals.error,
                statusCode: response.locals.statusCode,
                message: response.locals.message
            });
        }
};

export const getUserId = (context: ActionContext<any>) => {
    if (!context.user.id) {
        throw {
            code: otherCodes.BADAUTHREQUEST,
            message: "Bad Authorization Request"
        };
    }

    return context.user.id;
};