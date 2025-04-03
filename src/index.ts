import express from "express";
import passport from "./config/passport.config";
import api from "./api/v1/route";
import { getEnv } from "./utils/env";
import { notFoundHandler } from "./middlewares/route-not-found.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import { MESSAGES } from "./utils/message";

const { PORT, NODE_ENV } = getEnv();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.get("/", (_, res) => {
  res.jsonp({ message: MESSAGES.SERVER.SERVER_INITIALIZED });
});
app.use(api);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  if (NODE_ENV !== "production") {
    console.log(`[Server] Running on http://localhost:${PORT}`);
    console.log(`[Environment] ${process.env.NODE_ENV}`);
  }
});
