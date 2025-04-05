import passport from "passport";
import consts from "../utils/consts";
import { jwtStrategy } from "./strategy/jwt.strategy";

const { passportAuthKey } = consts;

passport.use(jwtStrategy);

export const useAuth = () =>
  passport.authenticate(passportAuthKey, {
    session: false,
  });

export default passport;
