import { prisma } from "../config/db";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response } from "express";

const SECRET_KEY = process.env.JWT_SECRET;
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

export const login = async (email: string, password: string, res: Response) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password field must filled");
    }

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    const userPass = user?.password;

    if (!userPass) {
      throw new Error("Email or password incorrect");
    }
    const comparePassword = await bcrypt.compare(password, userPass);

    if (!user || !comparePassword) {
      res.clearCookie("access_token", { path: "/" });
      throw new Error("Email or password incorrect");
    }

    const payload = {
      userId: user.id,
      userName: user.name,
      email: user.email,
    };

    if (!SECRET_KEY) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ payload }, SECRET_KEY, { expiresIn: "1d" });

    res.cookie("access_token", token, {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { message: "Login berhasil" };
  } catch (error) {
    console.error("Error fetching product", error);
    throw error;
  }
};
