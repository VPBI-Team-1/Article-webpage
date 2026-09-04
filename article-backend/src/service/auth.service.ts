import { prisma } from "../config/db";
import * as bcrypt from "bcrypt";

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    return prisma.$transaction(async (tx) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await tx.users.upsert({
        where: {
          email: email,
        },
        update: {},
        create: {
          email,
          name,
          password: hashedPassword,
        },
      });

      return user;
    });
  } catch (error) {
    console.error("Error fetching product", error);
    throw error;
  }
};
