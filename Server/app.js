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
import packageRoute from './src/routes/packages.js'

app.use('/api', loginRoute)
app.use('/api/tests', testsRoute)
app.use('/api/packages', packageRoute)


app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500
    let message = err.message || "Something went wrong"

    if (err.code === 'P2025') {
        statusCode = 404
        message = "Record not found"
    }
    else if (err.code === 'P2002') {
        statusCode = 409
        message = "A record with this value already exists"
    }

    if (statusCode === 500) console.error(err)

    res.status(statusCode).json({
        success: false,
        message: statusCode === 500 ? "Something went wrong" : message,
        errors: err.errors || []
    })
})

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