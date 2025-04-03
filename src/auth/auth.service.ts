import { type SignInSchema, type SignUpSchema, signUpSchema } from "./schema";
import { usersService } from "../users/users.service";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { getEnv } from "../utils/env";
import { NotFoundError, ValidationError } from "../utils/errors";
import { MESSAGES } from "../utils/message";

export const authService = {
  signUp: async (data: SignUpSchema) => {
    const {
      success,
      data: signUpData,
      error,
    } = await signUpSchema.safeParseAsync(data);
    if (!success) {
      throw new ValidationError(error.message);
    }

    return usersService.create(signUpData);
  },

  signIn: async (data: SignInSchema) => {
    const {
      success,
      data: signUpData,
      error,
    } = await signUpSchema.safeParseAsync(data);
    if (!success) {
      throw new ValidationError(error.message);
    }
    const { email, password } = signUpData;
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

    const token = sign(payload, process.env.JWT_SECRET, {
      expiresIn: getEnv().JWT_EXPIRES_IN,
    });

    return { user, token };
  },
};
