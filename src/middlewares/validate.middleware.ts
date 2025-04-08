import type { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { ValidationError } from "../utils/errors";

type Targets = "body" | "query" | "params";

export const validate =
  (schema: AnyZodObject, target: Targets = "body") =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = await schema.safeParseAsync(req[target]);
    if (!success) {
      const validationError = new ValidationError(error.message);
      req.log.error({ name: "Server" }, validationError.message);
      res.status(validationError.statusCode).json(validationError);
      return;
    }
    req.validated = { ...req.validated, [target]: data };
    next();
  };
