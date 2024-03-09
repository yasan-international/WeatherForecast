import { Request, Response, NextFunction } from "express";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

export enum Methods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
};

export type Route = {
    method: string,
    path: string,
    middlewares: Middleware[],
    action: ControllerAction<any,any>
};

export type Middleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => void;

export type ControllerAction<P,O> = (
    context: ActionContext<P>
) => Promise<O>;

export type ActionContext<P> = {
    params: P,
    user: {
        id: string
    }
};

export type QueryResult = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | 
    ResultSetHeader;

export type ErrorResponse = {
    message: string,
    statusCode: number
}

export type ErrorPayload = {
    message: string,
    sqlMessage: string,
    code: string
}