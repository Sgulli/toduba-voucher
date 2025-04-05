import { NextFunction, Request, Response } from "express";

export interface IAuthController {
  signin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  signup: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  me: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
