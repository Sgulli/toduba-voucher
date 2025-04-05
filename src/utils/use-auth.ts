import { NextFunction, Request, Response } from "express";
import passport from "passport";
import consts from "./consts";
import { UnauthorizedError } from "./errors";

const { passportAuthKey } = consts;

export const useAuth = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate(
    passportAuthKey,
    {
      session: false,
      failWithError: true,
    },
    (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        const unauthorizedError = new UnauthorizedError(
          info?.message ?? "Unauthorized"
        );
        return next(unauthorizedError);
      }
      req.user = user;
      return next();
    }
  )(req, res, next);
