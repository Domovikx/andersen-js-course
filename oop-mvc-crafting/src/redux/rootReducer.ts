import combineReducers from './helpers/combineReducers';

import ingredientsListReducer from './modules/ingredientsList/ingredientsListReducer';
import recipeListReducer from './modules/recipeList/recipeListReducer';
import formNewRecipeReducer from './modules/formNewRecipe/formNewRecipeReducer';

const rootReducer = combineReducers({
  ingredientsList: ingredientsListReducer,
  recipeList: recipeListReducer,
  formNewRecipe: formNewRecipeReducer,
});

export default rootReducer;
