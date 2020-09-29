/**
 * Диаграмма сущностей:
 * https://drive.google.com/file/d/1Gm5QuSNpD4Ya59FRN33uBTWWNGRK1kna/view?usp=sharing
 */

import mongoose from 'mongoose';
import { COLLECTION_PLAYERS } from './constants';
const Schema = mongoose.Schema;

export const PlayerModel = mongoose.model(
  COLLECTION_PLAYERS,
  new Schema({
    number: {
      type: Number,
      required: false,
    },
    name: {
      type: String,
      required: true,
      unique: false,
    },
    sex: {
      type: String,
      required: false,
    },
    level: {
      type: Number,
      required: false,
    },
    power: {
      type: Number,
      required: false,
    },
    class: {
      type: String,
      required: false,
    },
    race: {
      type: String,
      required: false,
    },
    dice: {
      type: Number,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
  }),
);
