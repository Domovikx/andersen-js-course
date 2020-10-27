import {
  RECIPE_LIST__ADD,
  RECIPE_LIST__REMOVE,
  RECIPE_LIST__PLUS,
  RECIPE_LIST__MINUS,
} from './recipeListTypes';
import { stateHandler, GET_STATE } from '../../stateHandler';

export default function recipeListReducer(
  state: any = stateHandler(GET_STATE).recipeList,
  { type, payload }: any,
) {
  let key;
  let value;
  let item;

  switch (type) {
    case RECIPE_LIST__REMOVE:
      key = payload.key;
      delete state[key];
      return { ...state };

    case RECIPE_LIST__ADD:
      key = payload.key;
      value = payload.value;
      return { ...state, [key]: value };

    case RECIPE_LIST__PLUS:
      key = payload.key;
      value = payload.value;
      item = state[key];
      item[value] += 1;
      return { ...state, [key]: item };

    case RECIPE_LIST__MINUS:
      key = payload.key;
      value = payload.value;
      item = state[key];
      item[value] = item[value] > 1 ? item[value] - 1 : 1;
      return { ...state, [key]: item };

    default:
      return state;
  }
}
