import { RequestHandler } from "express";
import { NotFoundError } from "../utils/errors";

export const notFoundHandler: RequestHandler = (req, res, next) => {
  const notFoundError = new NotFoundError(`
    ${req.method} ${req.originalUrl} not found`);
  req.log.error({ name: "Server" }, notFoundError.message);
  res.status(notFoundError.statusCode).json({
    error: notFoundError.message,
  });
};
