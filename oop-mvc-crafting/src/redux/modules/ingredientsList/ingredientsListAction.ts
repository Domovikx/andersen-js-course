import {
  INGREDIENT_LIST__REMOVE,
  INGREDIENT_LIST__PLUS,
  INGREDIENT_LIST__MINUS,
  INGREDIENT_LIST__UPDATE,
} from './ingredientsListTypes';

export function ingredientListPlus(key: string | null) {
  return {
    type: INGREDIENT_LIST__PLUS,
    payload: { key },
  };
}

export function ingredientListMinus(key: string | null) {
  return {
    type: INGREDIENT_LIST__MINUS,
    payload: { key },
  };
}

export function ingredientListRemove(key: string | null) {
  return {
    type: INGREDIENT_LIST__REMOVE,
    payload: { key },
  };
}

export function ingredientListUpdate(ingredientsList: any, action: string) {
  return {
    type: INGREDIENT_LIST__UPDATE,
    payload: { ingredientsList, action },
  };
}

export const REMOVE_ITEMS = 'REMOVE_ITEMS';
export const ADD_ITEMS = 'ADD_ITEMS';
