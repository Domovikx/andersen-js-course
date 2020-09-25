import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { connect } from 'mongoose';
import { Request, Response } from 'express';
import { MONGO_URI } from './config/config';

import { playerRoute } from './routes/playerRoute';

const server = express();

connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.info('MongoDB connected - success.'))
  .catch((error) => console.error(error));

// Server check - (GET) http://localhost:3000
server.get('/', (req: Request, res: Response): void => {
  res.status(200);
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

server.get('/api', (req: Request, res: Response): void => {
  res.status(200).json({
    message: 'REST API - работает!',
  });
});

// morgan
server.use(morgan('dev'));

// body-parser
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// cors
server.use(cors());

// routes
server.use('/api/player', playerRoute);

export { server };
