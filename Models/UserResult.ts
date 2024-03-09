import { QueryResult } from "../Helpers/types";

export type UserResult = {
    Id: string,
    Contact: string,
    IsGuest: boolean
};

export type UserModel = {
    id: string,
    contact: string,
    isGuest: boolean
};

export const applyUserModel = (result: QueryResult) => {
    return (result as UserResult[]).map((data: UserResult) => ({
        id: data.Id,
        contact: data.Contact,
        isGuest: data.IsGuest
    }));
};