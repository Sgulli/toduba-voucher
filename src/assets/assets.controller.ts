import { HTTP_STATUS } from "../utils/http-status";
import { Response } from "../utils/response";
import { tryCatch } from "../utils/try-catch";
import { assetsService } from "./assets.service";
import { IAssetsController } from "./interfaces/assets-controller.interface";

export const assetsController: IAssetsController = {
  get: async (req, res, next) => {
    const { error, data } = await tryCatch(assetsService.get(req.params.id));
    if (error) return next(error);
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  },
  upload: async (req, res, next) => {
    const { alt } = req.validated?.body ?? {};
    const { error, data } = await tryCatch(
      assetsService.upload(req.params.productId, alt, req.file)
    );
    if (error) return next(error);
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.CREATED).jsonp(apiResponse);
  },
};
