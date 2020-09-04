import { INGREDIENT_LIST__ADD } from '../ingredientsList/ingredientsListTypes';

export function ingredientListAdd(key: string | null) {
  console.log('INGREDIENT_LIST__ADD :>> ');
  return {
    type: INGREDIENT_LIST__ADD,
    payload: { key },
  };
}
