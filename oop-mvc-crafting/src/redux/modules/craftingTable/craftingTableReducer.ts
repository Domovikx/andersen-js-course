import {
  CRAFTING_TABLE__ADD_RECIPE,
  CRAFTING_TABLE__ADD_INGREDIENT,
  CRAFTING_TABLE__CLEAR_FORM,
  CRAFTING_TABLE__INIT_RECIPE_LIST,
} from './craftingTableTypes';

import { GET_STATE, stateHandler } from '../../stateHandler';

export default function craftingTableReducer(
  state: any = stateHandler(GET_STATE).craftingTable,
  { type, payload }: any,
) {
  switch (type) {
    case CRAFTING_TABLE__ADD_RECIPE:
      let key = payload.key;
      return { ...state, ['recipeName']: key };

    case CRAFTING_TABLE__INIT_RECIPE_LIST:
      let recipeList = payload.recipeList;
      return { ...state, recipeList };

    case CRAFTING_TABLE__ADD_INGREDIENT:
      key = payload.key;
      const ingredientsList = payload.ingredientsList;
      const ingredientInStock = ingredientsList[key];
      const exists = state.recipeList[key].exists;

      if (exists >= ingredientInStock) {
        state.recipeList[key].exists = ingredientInStock;
      } else if (exists < state.recipeList[key].required) {
        state.recipeList[key].exists += 1;
      }
      return { ...state };

    case CRAFTING_TABLE__CLEAR_FORM:
      return {
        recipeName: '',
        recipeList: {},
        countCrafting: 0,
      };

    default:
      return state;
  }
}