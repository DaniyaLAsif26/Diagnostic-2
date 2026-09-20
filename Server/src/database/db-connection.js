import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { env } from "../config/env.js";

const globalForPrisma = globalThis

function createPrismaClient() {
    const adapter = new PrismaPg({
        connectionString: env.DATABASE_URL,
        max: env.DATABASE_POOL_MAX,
        idleTimeoutMillis: env.DATABASE_IDLE_TIMEOUT_MS,
        ssl: env.databaseSsl ? { rejectUnauthorized: false } : false,
    })

    return new PrismaClient({ 
        adapter ,
        log: env.NODE_ENV === "production" ? ["warn", "error"] : ["query", "warn", "error"],
    });

}

const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export { prisma };