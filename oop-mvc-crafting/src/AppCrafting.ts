import IngredientsList from './components/IngredientsList';
import FormNewIngredient from './components/FormNewIngredient';

import RecipeList from './components/RecipeList';
import FormNewRecipe from './components/FormNewRecipe';

import CraftingTable from './components/CraftingTable';

import ReadyList from './components/ReadyList';

import { render, html } from 'lit-html';

import store from './redux/helpers/store';
import {
  stateHandler,
  SAVE_STATE_TO_LOCAL_STORAGE,
} from './redux/stateHandler';

export default class AppCrafting extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    store.subscribe(() => {
      stateHandler(SAVE_STATE_TO_LOCAL_STORAGE);
    });

    customElements.define('ingredients-list', IngredientsList);
    customElements.define('form-new-ingredient', FormNewIngredient);

    customElements.define('recipe-list', RecipeList);
    customElements.define('form-new-recipe', FormNewRecipe);

    customElements.define('crafting-table', CraftingTable);

    customElements.define('ready-list', ReadyList);

    render(
      html`
        <ingredients-list></ingredients-list>
        <form-new-ingredient></form-new-ingredient>

        <recipe-list></recipe-list>
        <form-new-recipe></form-new-recipe>

        <crafting-table></crafting-table>

        <ready-list></ready-list>
      `,
      this,
    );
  }
}
