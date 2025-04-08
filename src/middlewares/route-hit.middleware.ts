import { RequestHandler } from "express";

export const routeHitHandler: RequestHandler = (req, res, next) => {
  const { method, originalUrl } = req;
  req.log.info({ name: "Server" }, `${method} ${originalUrl}`);
  next();
};
