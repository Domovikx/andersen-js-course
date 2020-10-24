/**
 * (GET) http://localhost:3000/api/player/all - getAll
 * (GET) http://localhost:3000/api/player/:id - getById
 * (DELETE) http://localhost:3000/api/player/:id - remove
 * (POST) http://localhost:3000/api/player/create - create
 * (PATCH) http://localhost:3000/api/player/update - update
 */

import express from 'express';
import { PlayerController } from '../controllers/PlayerController';

const playerRoute = express.Router();
const playerController = new PlayerController();

playerRoute.get('/all', playerController.getAll);

playerRoute.get('/:id', playerController.getById);

playerRoute.delete('/:id', playerController.remove);

playerRoute.post('/create', playerController.create);

playerRoute.patch('/update', playerController.update);

export { playerRoute };
