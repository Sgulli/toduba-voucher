import { type User } from "@prisma/client";
import { type IService } from "../../interfaces/service.interface";
import { type CreateUser } from "../schema";

type UserWithoutPassword = Omit<User, "password">;

export interface IUsersService
  extends IService<CreateUser, UserWithoutPassword> {
  getByEmail: (email: string) => Promise<User | null>;
}
