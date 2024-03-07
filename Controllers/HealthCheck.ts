import { ControllerAction } from "../Helpers/types";

export const healthCheck: ControllerAction<void, boolean> = async (context) => {
    console.log("Health Check Done!");
    return true;
};