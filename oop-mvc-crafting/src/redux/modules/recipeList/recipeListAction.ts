import { RECIPE_LIST__REMOVE } from './recipeListTypes';

export function recipeListRemove(key: string | null) {
  return {
    type: RECIPE_LIST__REMOVE,
    payload: { key },
  };
}
