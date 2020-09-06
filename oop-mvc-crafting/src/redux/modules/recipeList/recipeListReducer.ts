import initialState from '../../initialState';
import { RECIPE_LIST__ADD, RECIPE_LIST__REMOVE } from './recipeListTypes';

export default function recipeListReducer(
  state: any = initialState.recipeList,
  { type, payload }: any,
) {
  switch (type) {
    case RECIPE_LIST__REMOVE:
      let key = payload.key;
      delete state[key];
      return state;

    case RECIPE_LIST__ADD:
      key = payload.key;
      let value = payload.value;
      return { ...state, [key]: value };

    default:
      return state;
  }
}
