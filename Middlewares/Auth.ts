import { Middleware } from "../Helpers/types";
import { UserModel } from "../Models/UserResult";
import { createUser, getUserDetails } from "../Services/Auth";
import { v4 as uuidv4 } from "uuid";

export const validateOrGuestLogin: Middleware = async (request, response, next) => {
    const user: UserModel = request.params.id ? 
        await getUserDetails(request.params.id) : null;

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