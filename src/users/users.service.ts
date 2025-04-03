import { User } from "@prisma/client";
import { prisma } from "../db/prisma";
import { IService } from "../interfaces/service.interface";
import {
  createUserSchema,
  updateUserSchema,
  type CreateUser,
  type UpdateUser,
} from "./schema";
import { hashPassword } from "../utils/hash-password";
import { ConflictError, NotFoundError, ValidationError } from "../utils/errors";
import { MESSAGES } from "../utils/message";

interface IusersService extends IService<CreateUser, User> {
  getByEmail: (email: string) => Promise<User | null>;
}

export const usersService: IusersService = {
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

    if (userData.password)
      userData.password = await hashPassword(userData.password);
    return prisma.user.create({
      data: userData,
    });
  },
  getAll: async () => {
    return prisma.user.findMany();
  },
  get: (id: string) => {
    return prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
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

    if (userData.password)
      userData.password = await hashPassword(userData.password);
    return prisma.user.update({
      where: {
        id,
      },
      data: userData,
    });
  },
  delete: async (id: string) => {
    const existingUser = await usersService.get(id);
    if (!existingUser) {
      throw new NotFoundError(MESSAGES.USER.NOT_FOUND);
    }
    return prisma.user.delete({
      where: {
        id,
      },
    });
  },
};
