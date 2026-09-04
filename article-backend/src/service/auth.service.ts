import { prisma } from "../config/db";
import * as bcrypt from "bcrypt";

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    return prisma.$transaction(async (tx) => {
      // 1. Cek apakah email sudah terdaftar
      const existingUser = await tx.users.findUnique({
        where: { email },
      });

      if (existingUser) {
        // Lempar error agar ditangkap oleh errorHandler
        const error = new Error("Email sudah terdaftar!");
        (error as any).status = 400;
        throw error;
      }

      // 2. Jika email belum ada, baru hash password & buat user baru
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await tx.users.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      return newUser;
    });
  } catch (error) {
    console.error("Error fetching product", error);
    throw error;
  }
};
