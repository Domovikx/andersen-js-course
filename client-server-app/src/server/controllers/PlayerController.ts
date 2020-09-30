import { Request, Response } from 'express';
import { PlayerModel } from '../models/PlayerModel';
import { errorHandler } from '../utils/errorHandler';

export class PlayerController {
  async getAll(req: Request, res: Response) {
    try {
      const players = await PlayerModel.find();
      res.status(200).json(players);
    } catch (err) {
      errorHandler(res, err);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const player = await PlayerModel.findById(req.params.id);
      res.status(200).json(player);
    } catch (err) {
      errorHandler(res, err);
    }
  }

  async remove(req: Request, res: Response) {
    try {
      await PlayerModel.remove({ _id: req.params.id });
      res.status(200).json({
        message: 'Категория удалена.',
      });
    } catch (err) {
      errorHandler(res, err);
    }
  }

  async create(req: Request, res: Response) {
    const category = new PlayerModel(req.body.player);
    try {
      await category.save();
      res.status(201).json(category);
    } catch (err) {
      errorHandler(res, err);
    }
  }

  async update(req: any, res: Response) {
    try {
      const player = await PlayerModel.findByIdAndUpdate(
        { _id: req.body.id },
        req.body.player,
      );
      res.status(200).json(player); //TODO: опционально возврат player
    } catch (err) {
      errorHandler(res, err);
    }
  }
}
