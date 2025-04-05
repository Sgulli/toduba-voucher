import express from "express";
import { useAuth } from "../config/passport.config";
import { API_PATHS } from "../utils/api-paths";
import { authController } from "./auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { signInSchema, signUpSchema } from "./schema";

const router = express.Router();

router.post(
  API_PATHS.AUTH.SIGN_UP,
  validate(signUpSchema),
  authController.signup
);

router.post(
  API_PATHS.AUTH.SIGN_IN,
  validate(signInSchema),
  authController.signin
);

router.get(API_PATHS.AUTH.ME, useAuth(), authController.me);

export default router;
