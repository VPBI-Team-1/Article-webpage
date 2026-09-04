import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mariadb from "mariadb";

const rawUrl = process.env.DATABASE_URL;

if (!rawUrl) {
  throw new Error("DATABASE_URL belum didefinisikan di file .env");
}

const mariadbUrl = rawUrl.replace(/^mysql:\/\//, "mariadb://");

const pool = mariadb.createPool(mariadbUrl);
const adapter = new PrismaMariaDb(pool as any);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

globalForPrisma.prisma = prisma;
