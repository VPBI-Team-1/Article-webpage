import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mariadb from "mariadb";

// 1. Inisialisasi pool koneksi dari driver mariadb
const pool = mariadb.createPool(process.env.DATABASE_URL as string);

// 2. Oper instance pool ke PrismaMariaDb dengan type assertion 'as any'
const adapter = new PrismaMariaDb(pool as any);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
