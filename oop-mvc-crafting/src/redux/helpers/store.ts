import createStore from './createStore';
import rootReducer from '../rootReducer';
import { stateHandler, GET_STATE } from '../stateHandler';

const store: any = createStore(rootReducer, stateHandler(GET_STATE));

export default store;
