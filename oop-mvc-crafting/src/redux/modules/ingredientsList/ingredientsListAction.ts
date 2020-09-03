import {
  INGREDIENT_LIST__ADD,
  INGREDIENT_LIST__REMOVE,
  INGREDIENT_LIST__PLUS,
  INGREDIENT_LIST__MINUS,
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

export function ingredientListAdd() {
  console.log('INGREDIENT_LIST__ADD :>> ');
  return {
    type: INGREDIENT_LIST__ADD,
  };
}
