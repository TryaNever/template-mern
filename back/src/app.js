import cors from 'cors';
import "dotenv/config";
import express from 'express';
import Router from './routes/index.js';

import NotfoundMiddleware from './middlewares/NotfoundMiddleware.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

const port = process.env.PORT_EXPRESS || 3000;
const corsOrigin = process.env.CORS_ORIGINS || 'http://localhost:5173';

const corsOptions = {
  origin: corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('hello world');
});

app.use('/api', Router);

app.use(NotfoundMiddleware);
app.use(errorMiddleware);

export default app;