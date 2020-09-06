import {
  FORM_NEW_RECIPE__ADD_INGREDIENT,
  FORM_NEW_RECIPE__INGREDIENT_PLUS,
  FORM_NEW_RECIPE__INGREDIENT_MINUS,
  FORM_NEW_RECIPE__INGREDIENT_REMOVE,
  FORM_NEW_RECIPE__CLEAR_FORM,
} from './formNewRecipeTypes';

export function addIngredient(key: string | null) {
  return {
    type: FORM_NEW_RECIPE__ADD_INGREDIENT,
    payload: { key },
  };
}

export function ingredientPlus(key: string | null) {
  return {
    type: FORM_NEW_RECIPE__INGREDIENT_PLUS,
    payload: { key },
  };
}

export function ingredientMinus(key: string | null) {
  return {
    type: FORM_NEW_RECIPE__INGREDIENT_MINUS,
    payload: { key },
  };
}

export function ingredientRemove(key: string | null) {
  return {
    type: FORM_NEW_RECIPE__INGREDIENT_REMOVE,
    payload: { key },
  };
}

export function clearForm() {
  return {
    type: FORM_NEW_RECIPE__CLEAR_FORM,
  };
}
