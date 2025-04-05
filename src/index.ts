import express from "express";
import api from "./api/v1/route";
import cors from "cors";
import { passport } from "./config";
import { getEnv } from "./utils/env";
import { notFoundHandler, errorHandler } from "./middlewares";

const { PORT, NODE_ENV } = getEnv();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

app.use(api);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  if (NODE_ENV !== "production") {
    console.log(`[Server] Running on http://localhost:${PORT}`);
    console.log(`[Environment] ${process.env.NODE_ENV}`);
  }
});
