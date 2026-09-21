import express from 'express';
import cors from 'cors'

import { prisma } from "./src/database/db-connection.js"
import { env } from "./src/config/env.js";

const app = express();

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.get('/api/health', (_, res) => {
    res.status(200).json({
        success: true,
        status: 'ok'
    })
})

import loginRoute from './src/routes/login.js'
import testsRoute from './src/routes/tests.js'

app.use('/api' , loginRoute )
app.use('/api/tests' , testsRoute )

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