import express from "express";
import apiRouter from "./Routes/index";

const app = express();
const port = process.env.PORT;

const welcomeHtml = `<!DOCTYPE html>
    <html>

    <head>
        <title>Weather Forecast</title>
    </head>

    <body>
        <div>
            <h2>Welcome to Weather Forecase APIs</h2>
        </div>
    </body>

    </html>`;

app.use("/api", apiRouter);

app.use("/", (request, response, next) => {
    response.send(welcomeHtml);
});

app.listen(port, () => {
    console.log(`App is listening on: ${port}`);
})