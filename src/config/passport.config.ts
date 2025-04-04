import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { usersService } from "../users/users.service";
import { getEnv } from "../utils/env";
import { MESSAGES } from "../utils/message";
import consts from "../utils/consts";

const { passportAuthKey } = consts;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: getEnv().JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await usersService.get(payload.id);
      if (!user) {
        return done(null, false, {
          message: MESSAGES.USER.NOT_FOUND,
        });
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export const useAuth = () =>
  passport.authenticate(passportAuthKey, {
    session: false,
  });

export default passport;
