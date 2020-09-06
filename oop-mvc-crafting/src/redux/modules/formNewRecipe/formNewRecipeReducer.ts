import initialState from '../../initialState';
import {
  FORM_NEW_RECIPE__ADD_INGREDIENT,
  FORM_NEW_RECIPE__INGREDIENT_REMOVE,
  FORM_NEW_RECIPE__INGREDIENT_PLUS,
  FORM_NEW_RECIPE__INGREDIENT_MINUS,
  FORM_NEW_RECIPE__CLEAR_FORM,
} from './formNewRecipeTypes';

export default function formNewRecipeReducer(
  state: any = initialState.formNewRecipe,
  { type, payload }: any,
) {
  switch (type) {
    case FORM_NEW_RECIPE__ADD_INGREDIENT:
      let key = payload.key;
      return { ...state, [key]: 1 };

    case FORM_NEW_RECIPE__INGREDIENT_PLUS:
      key = payload.key;
      let count = state[key] + 1;
      return { ...state, [key]: count };

    case FORM_NEW_RECIPE__INGREDIENT_MINUS:
      key = payload.key;
      count = state[key] > 0 ? state[key] - 1 : 0;
      return { ...state, [key]: count };

    case FORM_NEW_RECIPE__INGREDIENT_REMOVE:
      key = payload.key;
      delete state[key];
      return state;

    case FORM_NEW_RECIPE__CLEAR_FORM:
      return {};

    default:
      return state;
  }
}
