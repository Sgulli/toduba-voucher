import express from "express";
import passport from "../config/passport.config";
import { authService } from "./auth.service";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const signUp = await authService.signUp(req.body);
  res.status(201).jsonp(signUp);
});

router.post("/signin", async (req, res) => {
  const signIn = await authService.signIn(req.body);
  res.status(200).jsonp(signIn);
});

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = req.user;
    res.status(200).jsonp(user);
  }
);

export default router;
