import { RECIPE_LIST__ADD, RECIPE_LIST__REMOVE } from './recipeListTypes';
import { stateHandler, GET_STATE } from '../../stateHandler';

export default function recipeListReducer(
  state: any = stateHandler(GET_STATE).recipeList,
  { type, payload }: any,
) {
  switch (type) {
    case RECIPE_LIST__REMOVE:
      let key = payload.key;
      delete state[key];
      return state;

    case RECIPE_LIST__ADD:
      key = payload.key;
      let value = payload.value;
      return { ...state, [key]: value };

    default:
      return state;
  }
}
