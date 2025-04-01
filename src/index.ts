import express from "express";
import passport from "./config/passport.config";
import { getEnv } from "./utils/env";

const { PORT } = getEnv();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.get("/", (_, res) => {
  res.jsonp({ message: "Server is up! :)" });
});

app.use((_, res) => {
  res.status(404).jsonp({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
  console.log(`[Environment] ${process.env.NODE_ENV}`);
});
