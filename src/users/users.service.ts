import { type User } from "@prisma/client";
import { type IUsersService } from "./interfaces/users.interface";
import { prisma } from "../db/prisma";
import {
  createUserSchema,
  updateUserSchema,
  type CreateUser,
  type UpdateUser,
} from "./schema";
import { hashPassword } from "../utils/hash-password";
import { ConflictError, NotFoundError, ValidationError } from "../utils/errors";
import { MESSAGES } from "../utils/message";
import { kv } from "../config";
import { kvKeyFn } from "../utils/kv-key-fn";

export const usersService: IUsersService = {
  create: async (data: CreateUser) => {
    const {
      success,
      data: userData,
      error,
    } = await createUserSchema.safeParseAsync(data);
    if (!success) throw new ValidationError(error.message);
    const existingUser = await usersService.getByEmail(userData.email);
    if (existingUser) throw new ConflictError(MESSAGES.USER.ALREADY_EXISTS);
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }
    const user = await prisma.user.create({
      data: userData,
    });
    await kv.del(kvKeyFn("users"));
    return user;
  },
  getAll: async () => {
    const cached = await kv.get<User[]>(kvKeyFn("users"));
    if (cached && cached.length > 0) return cached;
    const users = await prisma.user.findMany();
    await kv.set(kvKeyFn("users"), users);
    return users;
  },
  get: async (id: string) => {
    const cached = await kv.get<User>(kvKeyFn("users", id));
    if (cached) return cached;
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
    await kv.set(kvKeyFn("users", user.id), user);
    return user;
  },
  getByEmail: async (email: string) => {
    const cached = await kv.get<User>(kvKeyFn("users", email));
    if (cached) return cached;
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
    await kv.set(kvKeyFn("users", user.email), user);
    return user;
  },
  update: async (id: string, data: UpdateUser) => {
    const {
      success,
      data: userData,
      error,
    } = await updateUserSchema.safeParseAsync(data);

    if (!success) throw new ValidationError(error.message);

    const existingUser = await usersService.get(id);
    if (!existingUser) {
      throw new NotFoundError(MESSAGES.USER.NOT_FOUND);
    }

    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: userData,
    });
    await Promise.all([
      kv.set(kvKeyFn("users", user.id), user),
      kv.del(kvKeyFn("users")),
    ]);
    return user;
  },
  delete: async (id: string) => {
    const existingUser = await usersService.get(id);
    if (!existingUser) throw new NotFoundError(MESSAGES.USER.NOT_FOUND);

    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    await Promise.all([
      kv.set(kvKeyFn("users", user.id), user),
      kv.del(kvKeyFn("users")),
    ]);
    return user;
  },
};
