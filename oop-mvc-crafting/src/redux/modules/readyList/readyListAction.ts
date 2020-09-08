import store from '../../helpers/store';
import {
  READY_LIST__ADD,
  READY_LIST__DISASSEMBLE,
  READY_LIST__REMOVE,
} from './readyListTypes';

export function readyListAdd(key: string | null) {
  return {
    type: READY_LIST__ADD,
    payload: { key },
  };
}

export function readyListDisassemble(key: string | null) {
  const value = store.getState().formNewRecipe;
  return {
    type: READY_LIST__DISASSEMBLE,
    payload: { key, value },
  };
}

export function readyListRemove(key: string | null) {
  const value = store.getState().formNewRecipe;
  return {
    type: READY_LIST__REMOVE,
    payload: { key, value },
  };
}
