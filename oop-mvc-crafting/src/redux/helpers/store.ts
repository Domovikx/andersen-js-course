import createStore from './createStore';
import rootReducer from '../rootReducer';
import initialState from '../initialState';

const store: any = createStore(rootReducer, initialState);

export default store;
