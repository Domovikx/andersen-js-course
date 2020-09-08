import { READY_LIST__ADD, READY_LIST__REMOVE } from './readyListTypes';
import { stateHandler, GET_STATE } from '../../stateHandler';

export default function readyListReducer(
  state: any = stateHandler(GET_STATE).readyList,
  { type, payload }: any,
) {
  let count;
  let recipeName;
  let recipeList;

  switch (type) {
    case READY_LIST__ADD:
      recipeName = payload.recipeName;
      recipeList = payload.recipeList;
      count = state[recipeName] ? state[recipeName].count + 1 : 1;
      return { ...state, [recipeName]: { count, recipeList } };

    case READY_LIST__REMOVE:
      recipeName = payload.recipeName;

      count = state[recipeName] ? state[recipeName].count - 1 : 1;
      if (count <= 0) {
        delete state[recipeName];
        return { ...state };
      }

      const recipe = state[recipeName];
      recipe.count = count;
      return { ...state, [recipeName]: recipe };

    default:
      return state;
  }
}

// TODO спросить про деструктуризацию в свичах, и как изалировать скоупы
// хз можно ли так делать вообще, потому что начинает глючить
// если вспомню, посмотрю этот момент

// НО - это работает
