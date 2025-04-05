import express from "express";
import { useAuth } from "../config/passport.config";
import { API_PATHS } from "../utils/api-paths";
import { authController } from "./auth.controller";

const router = express.Router();

router.post(API_PATHS.AUTH.SIGN_UP, authController.signup);

router.post(API_PATHS.AUTH.SIGN_IN, authController.signin);

router.get(API_PATHS.AUTH.ME, useAuth(), authController.me);

export default router;
