import { PrismaClient } from "@prisma/client";
import { paginateExtension } from "./extensions/paginate.extension";

export const prisma = new PrismaClient().$extends(paginateExtension);
