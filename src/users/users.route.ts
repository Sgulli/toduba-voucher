import express from "express";
import { API_PATHS } from "../utils/api-paths";
import { usersController } from "./users.controller";
import { validate } from "../middlewares/validate.middleware";
import { createUserSchema, updateUserSchema } from "./schema";

const router = express.Router();

router.get(API_PATHS.USERS.GET_ALL, usersController.getAll);

router.get(API_PATHS.USERS.GET, usersController.get);

router.post(
  API_PATHS.USERS.CREATE,
  validate(createUserSchema),
  usersController.create
);

router.patch(
  API_PATHS.USERS.UPDATE,
  validate(updateUserSchema),
  usersController.update
);

router.delete(API_PATHS.USERS.DELETE, usersController.delete);

export default router;
