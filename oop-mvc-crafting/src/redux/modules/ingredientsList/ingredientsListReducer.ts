import {
  INGREDIENT_LIST__ADD,
  INGREDIENT_LIST__REMOVE,
  INGREDIENT_LIST__PLUS,
  INGREDIENT_LIST__MINUS,
} from './ingredientsListTypes';

import { stateHandler, GET_STATE } from '../../stateHandler';

export default function ingredientsListReducer(
  state: any = stateHandler(GET_STATE).ingredientsList,
  { type, payload }: any,
) {
  switch (type) {
    case INGREDIENT_LIST__PLUS:
      let key = payload.key;
      let count = state[key] + 1;
      return { ...state, [key]: count };
    // Это конечно можно еще всё рефакторить, но пока так

    case INGREDIENT_LIST__MINUS:
      key = payload.key;
      count = state[key] > 0 ? state[key] - 1 : 0;
      return { ...state, [key]: count };

    case INGREDIENT_LIST__REMOVE:
      key = payload.key;
      delete state[key];
      return state;

    case INGREDIENT_LIST__ADD:
      key = payload.key;
      return { ...state, [key]: 1 };

    default:
      return state;
  }
}
