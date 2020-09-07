import store from '../../redux/helpers/store';
import { html, render } from 'lit-html';

import './craftingTable.scss';

import {
  addRecipe,
  initRecipeList,
  clearForm,
  addIngredient,
} from '../../redux/modules/craftingTable/craftingTableAction';

export class CraftingTable extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */
    const state = store.getState();
    const craftingTable = state.craftingTable;
    const ingredientsList = state.ingredientsList;

    const renderView = (craftingTable: any, ingredientsList: any) => {
      const recipeList = craftingTable.recipeList;

      render(
        html`
          <h3>Crafting Table</h3>
          <div class="input-group">
            <span class="card" data-place-key="RECIPE_INPUT">
              ${craftingTable.recipeName}
            </span>
            <span class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                data-btn-key="RECIPE_LIST__ADD"
              >
                Craft
              </button>

              <button
                class="btn btn-outline-secondary material-icons"
                data-btn-key="CRAFTING_TABLE__CLEAR_FORM"
              >
                delete_sweep
              </button>
            </span>
          </div>

          <ul class="list-group">
            ${Object.entries(recipeList).map(
              ([key, { exists, required }]: any) =>
                html`
                  <li class="list-group-item" data-place-key=${key}>
                    ${key} :
                    ${exists <= ingredientsList[key]
                      ? exists
                      : ingredientsList[key]}
                    из ${required} (${ingredientsList[key]})

                    <span class="btn-group">
                      <button
                        class="btn btn-lg material-icons"
                        data-btn-value=${key}
                        data-btn-key="FORM_NEW_RECIPE__INGREDIENT_PLUS"
                      >
                        add_box
                      </button>
                    </span>
                  </li>
                `,
            )}
          </ul>
        `,
        this,
      );
    };

    renderView(craftingTable, ingredientsList);

    // Подписывапемся на обновление стейта
    store.subscribe(() => {
      const state = store.getState();
      renderView(state.craftingTable, state.ingredientsList);
    });

    /** ================= Controller =================
     * Подписка на события и управление
     */

    this.addEventListener('click', onClick);

    this.addEventListener('drop', onDrop);
    this.addEventListener('dragover', onDragOver);

    function onClick(event: Event | any) {
      const target: Element = event.target;
      const key: any = target.getAttribute('data-btn-key');
      const value = target.getAttribute('data-btn-value');

      startAction(key, value);
    }

    function onDragOver(event: any) {
      event.preventDefault();
      // TODO: Сделать подсветку
      // const target = event.target;
      // const recipePlace = document.querySelector(
      //   '.crafting-table-recipe-place',
      // );
    }

    function onDrop(event: any) {
      const key = event.dataTransfer.getData('key');
      const value = event.dataTransfer.getData('value');
      if (value === 'RECIPE') {
        startAction('CRAFTING_TABLE__ADD_RECIPE', key);
      }
      if (value === 'INGREDIENT') {
        startAction('FORM_NEW_RECIPE__INGREDIENT_PLUS', key);
      }
    }

    function startAction(key: string, value?: any) {
      switch (key) {
        case 'CRAFTING_TABLE__ADD_RECIPE':
          store.dispatch(addRecipe(value));
          const state: any = store.getState();
          const recipeList = state.recipeList[value];
          const initRecipeListData: any = {};
          Object.entries(recipeList).forEach(([key, val]: any) => {
            initRecipeListData[key] = {
              exists: 0,
              required: val,
            };
          });

          store.dispatch(initRecipeList(initRecipeListData));
          return;

        case 'CRAFTING_TABLE__CLEAR_FORM':
          store.dispatch(clearForm());
          return;

        case 'FORM_NEW_RECIPE__INGREDIENT_PLUS':
          const ingredientsList: any = store.getState().ingredientsList;
          store.dispatch(addIngredient(value, ingredientsList));
          return;

        default:
          return;
      }
    }
  }
}
