import { RequestHandler } from "express";

const requestWithBody = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export const routeHitHandler: RequestHandler = (req, _, next) => {
  const { method, originalUrl, body } = req;
  req.log.info({ name: "Server" }, `${method} ${originalUrl}`);

  if (requestWithBody.has(method) && Object.keys(body).length) {
    req.log.info(
      { name: "Server" },
      `Request Body: ${JSON.stringify(req.body)}`
    );
  }
  next();
};
