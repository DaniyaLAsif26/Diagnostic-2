import express from 'express';
import cors from 'cors'

import { prisma } from "./src/database/db-connection.js"
import { env } from "./src/config/env.js";

const app = express();

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173"
}))

app.get('/api/health', (_, res) => {
    res.status(200).json({
        success: true,
        status: 'ok'
    })
})

import loginRouter from './src/routes/login.js'

app.use('/api' , loginRouter )

async function start() {
    await prisma.$connect();
    console.log("Database connected successfully");

    app.listen(env.PORT, () => {
        console.log(`Server listening on port ${env.PORT}`);
    });
}

start().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});