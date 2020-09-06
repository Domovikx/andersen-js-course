import { RECIPE_LIST__REMOVE, RECIPE_LIST__ADD } from './recipeListTypes';
import store from '../../helpers/store';

export function recipeListRemove(key: string | null) {
  return {
    type: RECIPE_LIST__REMOVE,
    payload: { key },
  };
}

export function recipeListAdd(key: string | null) {
  const value = store.getState().formNewRecipe;
  return {
    type: RECIPE_LIST__ADD,
    payload: { key, value },
  };
}
