import express from "express";
import "dotenv/config";
import {internalServerErrorMiddleware} from "./middleware/internal-server-error.middleware.js";
import {routesNotFoundMiddleware} from "./middleware/routes-not-found.middleware.js";
import {router} from "./route/api.js";

const port = process.env.APP_PORT || 3000;
const appName = process.env.APP_NAME || "miaw";

const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.use("/", router);

app.set('view engine', 'ejs');
app.use(internalServerErrorMiddleware);
app.use(routesNotFoundMiddleware)

app.listen(port, () => {
    console.log(`${appName} running on port ${port}`)
})