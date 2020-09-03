import combineReducers from './helpers/combineReducers';

import ingredientsListReducer from './modules/ingredientsList/ingredientsListReducer';

const rootReducer = combineReducers({
  ingredientsList: ingredientsListReducer,
});

export default rootReducer;
