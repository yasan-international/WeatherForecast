export const statusCode = {
    success: 200,
    created: 204,
    badRequest: 400,
    forbidden: 403,
    internalServerError: 500,
    unAuthorized: 401,
    duplicate: 409,
    notFound: 404
};

export const statusMessage = {
    "403": "Service Authentication Failed",
    "503": "Service Down"
};

export const handleServiceResponseErrors = (url: string, status: number) => {
    var message = url + ": ";
    
    if (status == 403) {
        message += statusMessage[403];
    }
    else if (status == 503) {
        message += statusMessage[503];
        healthCheckService(url);
    }
    else {
        message += "Unexpected Error";
    }

    return message;
};

const healthCheckService = (url: string) => {
    /* 
        Health check logic can be added here to ping 
        an administration website or trigger emails using 
        some event triggered service like AWS Lambda.
    */
};