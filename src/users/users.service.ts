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

export const usersService: IUsersService = {
  create: async (data: CreateUser) => {
    const {
      success,
      data: userData,
      error,
    } = await createUserSchema.safeParseAsync(data);
    if (!success) {
      throw new ValidationError(error.message);
    }

    const existingUser = await usersService.getByEmail(userData.email);
    if (existingUser) {
      throw new ConflictError(MESSAGES.USER.ALREADY_EXISTS);
    }

    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }
    const user = await prisma.user.create({
      data: userData,
    });
    await kv.del("users:list");
    return user;
  },
  getAll: async () => {
    const cached = await kv.get<User[]>("users:list");
    if (cached) return cached;

    const users = await prisma.user.findMany();

    await kv.set("users:list", users);
    return users;
  },
  get: async (id: string) => {
    const cached = await kv.get<User>(`users:${id}`);
    if (cached) return cached;
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
    await kv.set(`users:${user.id}`, user);
    return user;
  },
  getByEmail: (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },
  update: async (id: string, data: UpdateUser) => {
    const {
      success,
      data: userData,
      error,
    } = await updateUserSchema.safeParseAsync(data);

    if (!success) {
      throw new ValidationError(error.message);
    }

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

    await kv.del("users:list");
    await kv.del(`users:${user.id}`);
    return user;
  },
  delete: async (id: string) => {
    const existingUser = await usersService.get(id);
    if (!existingUser) {
      throw new NotFoundError(MESSAGES.USER.NOT_FOUND);
    }
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    await kv.del("users:list");
    await kv.del(`users:${user.id}`);
    return user;
  },
};
