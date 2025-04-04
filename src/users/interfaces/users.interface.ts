import { type User } from "@prisma/client";
import { type IService } from "../../interfaces/service.interface";
import { type CreateUser } from "../schema";

export interface IUsersService extends IService<CreateUser, User> {
  getByEmail: (email: string) => Promise<User | null>;
}
