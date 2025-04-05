import { genSalt, hash } from "bcrypt";
import { getEnv } from "./env";

export const hashPassword = async (password: string) => {
  const MIN_SALT_LENGTH = getEnv().MIN_SALT_LENGTH;
  const salt = await genSalt(MIN_SALT_LENGTH);
  return hash(password, salt);
};
