import combineReducers from './helpers/combineReducers';

import ingredientsListReducer from './modules/ingredientsList/ingredientsListReducer';
import recipeListReducer from './modules/recipeList/recipeListReducer';
import formNewRecipeReducer from './modules/formNewRecipe/formNewRecipeReducer';
import craftingTableReducer from './modules/craftingTable/craftingTableReducer';

const rootReducer = combineReducers({
  ingredientsList: ingredientsListReducer,
  recipeList: recipeListReducer,
  formNewRecipe: formNewRecipeReducer,
  craftingTable: craftingTableReducer,
});

export default rootReducer;
