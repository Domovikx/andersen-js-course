import {
  RECIPE_LIST__REMOVE,
  RECIPE_LIST__ADD,
  RECIPE_LIST__PLUS,
  RECIPE_LIST__MINUS,
} from './recipeListTypes';

export function recipeListRemove(key: string | null) {
  return {
    type: RECIPE_LIST__REMOVE,
    payload: { key },
  };
}

export function recipeListAdd(key: string | null, value: any) {
  return {
    type: RECIPE_LIST__ADD,
    payload: { key, value },
  };
}

export function recipeListPlus(key: string | null, value: any) {
  return {
    type: RECIPE_LIST__PLUS,
    payload: { key, value },
  };
}

export function recipeListMinus(key: string | null, value: any) {
  return {
    type: RECIPE_LIST__MINUS,
    payload: { key, value },
  };
}
