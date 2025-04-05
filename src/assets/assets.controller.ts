import { ServerError } from "../utils/errors";
import { HTTP_STATUS } from "../utils/http-status";
import { Response } from "../utils/response";
import { tryCatch } from "../utils/try-catch";
import { assetsService } from "./assets.service";
import { IAssetsController } from "./interfaces/assets-controller.interface";

export const assetsController: IAssetsController = {
  get: async (req, res, next) => {
    const { error, data } = await tryCatch(assetsService.get(req.params.id));
    if (error) return next(new ServerError(error.message));
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  },
  upload: async (req, res, next) => {
    const { alt } = req.body;
    const { error, data } = await tryCatch(
      assetsService.upload(req.params.userId, alt, req.file)
    );
    if (error) return next(new ServerError(error.message));
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.CREATED).jsonp(apiResponse);
  },
};
