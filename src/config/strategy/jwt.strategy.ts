import { ExtractJwt, Strategy } from "passport-jwt";
import { getEnv } from "../../utils/env";
import { usersService } from "../../users/users.service";
import { MESSAGES } from "../../utils/message";
import { tryCatch } from "../../utils/try-catch";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: getEnv().JWT_SECRET,
};

export const jwtStrategy = new Strategy(jwtOptions, async (payload, done) => {
  const { data, error } = await tryCatch(usersService.get(payload.id));
  if (error) return done(error, false);
  if (!data) {
    return done(null, false, {
      message: MESSAGES.USER.NOT_FOUND,
    });
  }
  return done(null, data);
});
