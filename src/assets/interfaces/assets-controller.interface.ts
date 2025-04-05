import { IController } from "../../interfaces/controller.interface";
import { Request, Response, NextFunction } from "express";

export interface IAssetsController extends Pick<IController, "get"> {
  upload: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
