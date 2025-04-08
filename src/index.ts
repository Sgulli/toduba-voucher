import express from "express";
import api from "./api/v1/route";
import cors from "cors";
import { httpLogger, passport } from "./config";
import { getEnv } from "./utils/env";
import { notFoundHandler, errorHandler } from "./middlewares";
import { routeHitHandler } from "./middlewares/route-hit.middleware";
import { serverStartup } from "./utils/server-startup";

const { PORT } = getEnv();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());
app.use(httpLogger);
app.use(routeHitHandler);
app.use(api);

app.use(errorHandler);
app.use(notFoundHandler);
app.listen(PORT, serverStartup);
