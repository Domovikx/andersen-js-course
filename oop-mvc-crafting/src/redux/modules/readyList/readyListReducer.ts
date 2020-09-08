import { READY_LIST__ADD } from './readyListTypes';
import { stateHandler, GET_STATE } from '../../stateHandler';

export default function readyListReducer(
  state: any = stateHandler(GET_STATE).readyList,
  { type, payload }: any,
) {
  switch (type) {
    case READY_LIST__ADD:
      let key = payload.key;
      delete state[key];
      return state;

    // case READY_LIST__DISASSEMBLE:
    //   key = payload.key;
    //   let value = payload.value;
    //   return { ...state, [key]: value };

    // case READY_LIST__REMOVE:
    //   key = payload.key;
    //   let value = payload.value;
    //   return { ...state, [key]: value };

    default:
      return state;
  }
}
