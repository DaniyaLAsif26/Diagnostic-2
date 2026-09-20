import "dotenv/config";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing from the .env file.");
}

export const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: Number(process.env.PORT) || 5000,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_POOL_MAX: Number(process.env.DATABASE_POOL_MAX) || 10,
    DATABASE_IDLE_TIMEOUT_MS: Number(process.env.DATABASE_IDLE_TIMEOUT_MS) || 30000,
    databaseSsl: process.env.DATABASE_SSL === "true",
};
