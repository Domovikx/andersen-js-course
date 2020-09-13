import combineReducers from './helpers/combineReducers';

import ingredientsListReducer from './modules/ingredientsList/ingredientsListReducer';
import recipeListReducer from './modules/recipeList/recipeListReducer';
import formNewRecipeReducer from './modules/formNewRecipe/formNewRecipeReducer';
import craftingTableReducer from './modules/craftingTable/craftingTableReducer';
import readyListReducer from './modules/readyList/readyListReducer';
import viewReducer from './modules/view/viewReducer';

const rootReducer = combineReducers({
  ingredientsList: ingredientsListReducer,
  recipeList: recipeListReducer,
  formNewRecipe: formNewRecipeReducer,
  craftingTable: craftingTableReducer,
  readyList: readyListReducer,
  view: viewReducer,
});

export default rootReducer;
