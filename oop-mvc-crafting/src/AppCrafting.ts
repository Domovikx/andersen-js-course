import IngredientsList from './components/IngredientsList';
import CraftingTable from './components/CraftingTable';
import FormNewIngredient from './components/FormNewIngredient';
import FormNewRecipe from './components/FormNewRecipe';
import ReadyList from './components/ReadyList';
import RecipeList from './components/RecipeList';

export default class AppCrafting extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    customElements.define('crafting-table', CraftingTable);
    customElements.define('form-new-ingredient', FormNewIngredient);
    customElements.define('form-new-recipe', FormNewRecipe);
    customElements.define('ingredients-list', IngredientsList);
    customElements.define('ready-list', ReadyList);
    customElements.define('recipe-list', RecipeList);

    this.innerHTML = `
      <crafting-table></crafting-table>
      <form-new-ingredient></form-new-ingredient>
      <form-new-recipe></form-new-recipe>
      <ingredients-list></ingredients-list>
      <ready-list></ready-list>
      <recipe-list></recipe-list>`;
  }
}
