import express from "express";
import passport from "../config/passport.config";
import { authService } from "./auth.service";
import { Response } from "../utils/response";
import { HTTP_STATUS } from "../utils/http-status";
import { NotFoundError } from "../utils/errors";
import { MESSAGES } from "../utils/message";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const signUp = await authService.signUp(req.body);
  const apiResponse = Response.success(signUp);
  res.status(HTTP_STATUS.CREATED).jsonp(apiResponse);
});

router.post("/signin", async (req, res) => {
  const signIn = await authService.signIn(req.body);
  const apiResponse = Response.success(signIn);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = req.user;
    if (!user) throw new NotFoundError(MESSAGES.USER.NOT_FOUND);
    const apiResponse = Response.success(user);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  }
);

export default router;
