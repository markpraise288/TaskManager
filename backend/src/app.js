const express = require('express');
const cors = require('cors');
const { logger } = require('./middlewares/logger.middleware');
const authRouter = require('./modules/auth/auth.routes');
const tasksRouter = require('./modules/tasks/tasks.routes');
const { errorMiddleware } = require('./middlewares/error.middleware');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(logger);
app.use(authRouter);
app.use(tasksRouter);

app.use(errorMiddleware);

module.exports = app;
