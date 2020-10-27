import initialState from './initialState';
import store from './helpers/store';

export const SAVE_STATE_TO_LOCAL_STORAGE = 'SAVE_STATE_TO_LOCAL_STORAGE';
export const GET_STATE = 'GET_STATE';

export function stateHandler(action: string): any {
  switch (action) {
    case SAVE_STATE_TO_LOCAL_STORAGE:
      localStorage.setItem('craftingStore', JSON.stringify(store.getState()));
      return true;

    case GET_STATE:
      const craftingStore: any = localStorage.getItem('craftingStore');
      if (craftingStore) {
        return JSON.parse(craftingStore);
      }
      return initialState;

    default:
      return initialState;
  }
}
