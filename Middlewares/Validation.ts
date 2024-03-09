import { otherCodes } from "../Helpers/error";
import { Schema } from "../Helpers/types";

export const validateSchema = (schema: Schema[], params: any) => {
    schema.map((scheme) => {
        if (typeof params[scheme.key] != scheme.type) {
            throw {
                code: otherCodes.BADTYPEREQUEST,
                message: `Invalid type for ${scheme.key}`
            };
        }
    });

    return true;
};