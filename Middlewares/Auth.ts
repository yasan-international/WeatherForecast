import { Middleware } from "../Helpers/types";
import { UserModel } from "../Models/UserResult";
import { createUser, getUserDetails } from "../Services/Auth";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { statusCode } from "Helpers/response";

/* 
    Guest Login with just an id to maintain a partial 
    session since location data is not very sensitive 
    (alternatively we have a login option in UserRouter)
*/
export const validateOrGuestLogin: Middleware = async (request, response, next) => {
    
    // Id / Jwt passed as token after 'BearerToken {id/jwt}' in auth header.
    const authHeader = request.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;

    // If we implement the login functionality using UserRouter:
    /*
    jwt.verify(token, process.env.JWT_SECRET, function(error, decoded: jwt.JwtPayload) {
        if (error) {
            return response.status(statusCode.unAuthorized).send({ message: "Authorization Failed", error });
        }

        response.locals.user = {
            id: decoded.nameid
        }
    });
    */

    const user: UserModel = token ? await getUserDetails(token) : null;

    var userId;
    if (!user) {
        userId = uuidv4();

        const result: boolean = await createUser(userId, 1, null);
        if (!result) {
            console.error("User could not be created in the database");
            return;
        }
    }
    else {
        userId = user.id;
    }

    response.locals.user = {
        id: userId
    };

    next();
};