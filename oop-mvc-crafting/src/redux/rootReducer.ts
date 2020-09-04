import combineReducers from './helpers/combineReducers';

import ingredientsListReducer from './modules/ingredientsList/ingredientsListReducer';
import recipeListReducer from './modules/recipeList/recipeListReducer';

const rootReducer = combineReducers({
  ingredientsList: ingredientsListReducer,
  recipeList: recipeListReducer,
});

export default rootReducer;
