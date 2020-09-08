import {
  INGREDIENT_LIST__ADD,
  INGREDIENT_LIST__REMOVE,
  INGREDIENT_LIST__PLUS,
  INGREDIENT_LIST__MINUS,
  INGREDIENT_LIST__UPDATE,
} from './ingredientsListTypes';

import { stateHandler, GET_STATE } from '../../stateHandler';
import { ADD_ITEMS, REMOVE_ITEMS } from './ingredientsListAction';

export default function ingredientsListReducer(
  state: any = stateHandler(GET_STATE).ingredientsList,
  { type, payload }: any,
) {
  let key;
  let count;
  let action: string;
  let ingredientsList;

  switch (type) {
    case INGREDIENT_LIST__PLUS:
      key = payload.key;
      count = state[key] + 1;
      return { ...state, [key]: count };

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

    case INGREDIENT_LIST__UPDATE:
      action = payload.action;
      ingredientsList = payload.ingredientsList;

      const newIngredientsList: any = {};
      Object.entries(ingredientsList).reduce(
        (newIngredientsList, [key, val]: any) => {
          if (action === ADD_ITEMS) {
            newIngredientsList[key] = state[key] + val;
          } else if (action === REMOVE_ITEMS) {
            newIngredientsList[key] = state[key] - val;
          }
          return newIngredientsList;
        },
        newIngredientsList,
      );

      return { ...state, ...newIngredientsList };

    default:
      return state;
  }
}
