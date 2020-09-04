import IngredientsList from './components/IngredientsList';
import FormNewIngredient from './components/FormNewIngredient';

import RecipeList from './components/RecipeList';
import FormNewRecipe from './components/FormNewRecipe';

import CraftingTable from './components/CraftingTable';

import ReadyList from './components/ReadyList';

import { render, html } from 'lit-html';

export default class AppCrafting extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    customElements.define('ingredients-list', IngredientsList);
    customElements.define('form-new-ingredient', FormNewIngredient);

    customElements.define('recipe-list', RecipeList);
    customElements.define('form-new-recipe', FormNewRecipe);

    customElements.define('crafting-table', CraftingTable);

    customElements.define('ready-list', ReadyList);

    render(
      html`
        <form-new-ingredient></form-new-ingredient>
        <ingredients-list></ingredients-list>

        <recipe-list></recipe-list>
        <form-new-recipe></form-new-recipe>

        <crafting-table></crafting-table>

        <ready-list></ready-list>
      `,
      this,
    );
  }
}
