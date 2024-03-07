import { ActionContext, ControllerAction, Middleware } from "../Helpers/types";
import { NextFunction, Request, Response } from "express";
import { statusCode } from "../Helpers/response";

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

        try {
            const data = await controller(context);

            response.locals.data = data;
            response.locals.statusCode = statusCode.success;
        }
        catch(error) {
            response.locals.statusCode = statusCode.internalServerError;
            response.locals.message = error.message || "Internal Server Error";
            response.locals.error = error;
            response.locals.data = error.data;
        }
        finally {
            response.send({
                data: response.locals.data,
                error: response.locals.error,
                statusCode: response.locals.statusCode,
                message: response.locals.message
            });
        }
};