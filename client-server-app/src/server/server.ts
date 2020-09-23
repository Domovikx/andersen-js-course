import express from 'express';
import path from 'path';
import { connect } from 'mongoose';
import { Request, Response } from 'express';
import { MONGO_URI } from './config/config';
import { urlencoded, json } from 'body-parser';

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

// body-parser
server.use(urlencoded({ extended: true }));
server.use(json());

// routes
server.use('/api/player', playerRoute);

export { server };
