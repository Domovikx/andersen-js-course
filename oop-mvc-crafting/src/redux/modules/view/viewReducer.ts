import { stateHandler, GET_STATE } from '../../stateHandler';
import { SHOW_ON, SHOW_OFF } from './viewTypes';

export default function viewReducer(
  state: any = stateHandler(GET_STATE).recipeList,
  { type, payload }: any,
) {
  let newState;

  switch (type) {
    case SHOW_ON:
      newState = { ...state };
      if (payload.field) {
        newState[payload.key].list[payload.field] = 'show';
      } else {
        newState[payload.key].show = 'show';
      }
      return newState;

    case SHOW_OFF:
      newState = { ...state };
      if (payload.field) {
        newState[payload.key].list[payload.field] = '';
      } else {
        newState[payload.key].show = '';
      }
      return newState;

    default:
      return state;
  }
}
