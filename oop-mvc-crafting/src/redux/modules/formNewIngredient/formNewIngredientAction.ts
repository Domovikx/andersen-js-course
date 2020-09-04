import { INGREDIENT_LIST__ADD } from '../ingredientsList/ingredientsListTypes';

export function ingredientListAdd(key: string | null) {
  return {
    type: INGREDIENT_LIST__ADD,
    payload: { key },
  };
}
