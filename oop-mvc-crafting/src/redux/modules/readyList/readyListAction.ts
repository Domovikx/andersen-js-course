import {
  READY_LIST__ADD,
  READY_LIST__DISASSEMBLE,
  READY_LIST__REMOVE,
} from './readyListTypes';

export function readyListAdd(recipeName: any, rootRecipeList: any) {
  return {
    type: READY_LIST__ADD,
    payload: { recipeName, recipeList: rootRecipeList },
  };
}

export function readyListRemove(recipeName: string | null) {
  return {
    type: READY_LIST__REMOVE,
    payload: { recipeName },
  };
}
