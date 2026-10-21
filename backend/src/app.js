import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import Router from './routes/index.js'

import NotfoundMiddleware from './middlewares/NotfoundMiddleware.js'
import errorMiddleware from './middlewares/errorMiddleware.js'
import AppError from './utils/AppError.js'

const app = express()

const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

const corsOptions = {
    origin(origin, callback) {
        if (!origin || corsOrigins.includes(origin)) {
            callback(null, true)
            return
        }

        callback(new AppError(403, 'Origine CORS non autorisée'))
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

app.disable('x-powered-by')
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 300,
        standardHeaders: 'draft-8',
        legacyHeaders: false,
    })
)

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

app.use('/api', Router)

app.use(NotfoundMiddleware)
app.use(errorMiddleware)

export default app
