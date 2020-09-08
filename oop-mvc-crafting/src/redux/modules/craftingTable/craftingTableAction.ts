import {
  CRAFTING_TABLE__ADD_RECIPE,
  CRAFTING_TABLE__ADD_INGREDIENT,
  CRAFTING_TABLE__CLEAR_FORM,
  CRAFTING_TABLE__INIT_RECIPE_LIST,
} from './craftingTableTypes';

export function addRecipe(key: string | null) {
  return {
    type: CRAFTING_TABLE__ADD_RECIPE,
    payload: { key },
  };
}

export function initRecipeList(recipeList: string | null) {
  return {
    type: CRAFTING_TABLE__INIT_RECIPE_LIST,
    payload: { recipeList },
  };
}

export function addIngredient(key: string | null, ingredientsList: any) {
  return {
    type: CRAFTING_TABLE__ADD_INGREDIENT,
    payload: { key, ingredientsList },
  };
}

export function clearForm() {
  return {
    type: CRAFTING_TABLE__CLEAR_FORM,
  };
}
