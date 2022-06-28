import express from 'express';
import config from 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';

import { database } from './src/Config/database.js';
import ErrorHandler from './src/Middleware/errorHandler.js';
import router from './src/Routes/index.js';
import socketConnection from './src/Config/socket.js';

const PORT = process.env.PORT || 5000;
const app = express();
export const server = http.createServer(app);

const whitelist = process.env.WHITELIST;
export const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'device-remember-token',
    'Access-Control-Allow-Credentials',
    'Access-Control-Allow-Origin',
    'Origin',
    'Accept',
  ],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', router);
app.use(cookieParser());
app.use(ErrorHandler);

const start = async () => {
  try {
    await database.authenticate();
    await database.sync();
    socketConnection();
    server.listen(PORT, () => console.log('Server started on', PORT));
  } catch (e) {
    console.log(e);
  }
};

start();
