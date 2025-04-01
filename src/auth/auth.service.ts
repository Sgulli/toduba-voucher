import { type SignInSchema, type SignUpSchema, signUpSchema } from "./schema";
import { userService } from "../users/users.service";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { getEnv } from "../utils/env";

export const authService = {
  signUp: async (data: SignUpSchema) => {
    const {
      success,
      data: signUpData,
      error,
    } = await signUpSchema.safeParseAsync(data);
    if (!success) {
      throw new Error(error?.message);
    }

    return userService.create(signUpData);
  },

  signIn: async (data: SignInSchema) => {
    const {
      success,
      data: signUpData,
      error,
    } = await signUpSchema.safeParseAsync(data);
    if (!success) {
      throw new Error(error?.message);
    }
    const { email, password } = signUpData;
    const user = await userService.getByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
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
