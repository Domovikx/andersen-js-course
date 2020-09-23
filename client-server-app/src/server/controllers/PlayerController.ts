import { Request, Response } from 'express';
import { PlayerModel } from '../models/PlayerModel';
import { errorHandler } from '../utils/errorHandler';

export class PlayerController {
  async getAll(req: any, res: Response) {
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

  async create(req: any, res: Response) {
    const category = new PlayerModel({
      // TODO !!!

      // name: req.body.name,
      // user: req.user.id,
      // imageSrc: req.file ? req.file.path : '',

      name: 'name',
      sex: 'sex',
      level: 0,
      power: 0,
      class: 'class',
      race: 0,
      dice: 0,
      collar: 'collar',
    });

    try {
      await category.save();
      res.status(201).json(category);
    } catch (err) {
      errorHandler(res, err);
    }
  }

  async update(req: any, res: Response) {
    // TODO !!!
    // const updated: any = {
    //   name: req.body.name,
    // };
    // if (req.file) {
    //   updated.imageSrc = req.file.path;
    // }
    // try {
    //   const category = await PlayerModel.findOneAndUpdate(
    //     { _id: req.params.id },
    //     { $set: updated },
    //     { new: true },
    //   );
    //   res.status(200).json(category);
    // } catch (err) {
    //   errorHandler(res, err);
    // }
  }
}
