import { prisma } from "../config/db";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response } from "express";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  name: string;
  email: string;
  password: string;
}

const SECRET_KEY = process.env.JWT_SECRET;

export const register = async ({ name, email, password }: RegisterInput) => {
  try {
    return prisma.$transaction(async (tx) => {
      const existingUser = await tx.users.findUnique({
        where: { email },
      });

      if (existingUser) {
        const error = new Error("Email registered");
        (error as any).status = 400;
        throw error;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await tx.users.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };
    });
  } catch (error) {
    console.error("Error fetching product", error);
    throw error;
  }
};

export const login = async ({ email, password }: LoginInput, res: Response) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Email or password incorrect");
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      res.clearCookie("access_token", { path: "/" });
      throw new Error("Email or password incorrect");
    }

    const payload = {
      userId: user.id,
      name: user.name,
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

    return {
      message: "Login successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    console.error("Error fetching", error);
    throw error;
  }
};

export const logout = async (res: Response) => {
  try {
    res.clearCookie("access_token", {
      path: "/",
    });
    return { message: "Logout successfully" };
  } catch (error) {
    console.error("Error fetching", error);
    throw error;
  }
};

export const updateProfile = async (
  userId: number,
  data: { name?: string; email?: string; password?: string },
) => {
  try {
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: updateData,
    });

    // Remove password from return object
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  } catch (error: any) {
    if (error.code === "P2002") {
      const err = new Error("Email registered");
      (err as any).status = 400;
      throw err;
    }
    console.error("Error updating profile", error);
    throw error;
  }
};

