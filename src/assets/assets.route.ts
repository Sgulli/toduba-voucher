import express from "express";
import { API_PATHS } from "../utils/api-paths";
import { assetsController } from "./assets.controller";
import { useUpload } from "../utils/use-upload";
import consts from "../utils/consts";

const { fileName } = consts;
const router = express.Router();

router.post(
  API_PATHS.ASSETS.UPLOAD,
  useUpload(fileName),
  assetsController.upload
);

router.get(API_PATHS.ASSETS.GET, assetsController.get);

export default router;
