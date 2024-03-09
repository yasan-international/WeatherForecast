const redis = require("redis");

const client = redis.createClient(6379);

client.on("error", (error: any) => {
    console.error(error);
});

export default client;