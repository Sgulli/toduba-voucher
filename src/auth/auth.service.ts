import { type SignInSchema, type SignUpSchema } from "./schema";
import { usersService } from "../users/users.service";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { getEnv } from "../utils/env";
import { NotFoundError, ValidationError } from "../utils/errors";
import { MESSAGES } from "../utils/message";

function generateToken<T extends object>(
  payload: T,
  secret: string,
  expiresIn: number
) {
  return sign(payload, secret, {
    expiresIn,
  });
}

export const authService = {
  signUp: async (data: SignUpSchema) => {
    const { confirmPassword, ...rest } = data;
    const user = await usersService.create(rest);

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = generateToken(
      payload,
      getEnv().JWT_SECRET,
      getEnv().JWT_EXPIRES_IN
    );

    return { user, token };
  },

  signIn: async (data: SignInSchema) => {
    const { email, password } = data;
    const user = await usersService.getByEmail(email);
    if (!user) {
      throw new NotFoundError(MESSAGES.USER.NOT_FOUND);
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new ValidationError(MESSAGES.AUTH.INVALID_PASSWORD);
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = generateToken(
      payload,
      getEnv().JWT_SECRET,
      getEnv().JWT_EXPIRES_IN
    );

    return { user, token };
  },
};
