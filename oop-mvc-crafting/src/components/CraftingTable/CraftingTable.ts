import store from '../../redux/helpers/store';
import { html, render } from 'lit-html';

import './craftingTable.scss';
import {
  addRecipe,
  initRecipeList,
} from '../../redux/modules/craftingTable/craftingTableAction';

export class CraftingTable extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */
    const craftingTable = store.getState().craftingTable;

    const renderView = (craftingTable: any) => {
      const recipeList = craftingTable.recipeList;

      render(
        html`
          <h3>Crafting Table</h3>
          <div class="input-group">
            <span class="card crafting-table-recipe-place">
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
                data-btn-key="FORM_NEW_RECIPE__CLEAR_FORM"
              >
                delete_sweep
              </button>
            </span>
          </div>

          <ul class="list-group">
            ${Object.entries(recipeList).map(
              ([key, val]: any) =>
                html`
                  <li class="list-group-item">
                    ${key} : ${val[0]} из ${val[1]} (${val[2]})

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

    renderView(craftingTable);

    // Подписывапемся на обновление стейта
    store.subscribe(() => {
      const state = store.getState();
      renderView(state.craftingTable);
    });
    // store.subscribe(() => {
    //   // console.log('state.craftingTable :>> ');
    //   const state = store.getState();
    //   renderView(state.ingredientsList);
    // });

    /** ================= Controller =================
     * Подписка на события и управление
     */

    this.addEventListener('click', onClick);

    this.addEventListener('drop', onDrop);
    this.addEventListener('dragover', onDragOver);
    this.addEventListener('dragstart', onDragStart);

    function onClick(event: Event | any) {
      // const target: Element = event.target;
      // const key = target.getAttribute('data-btn-key');
      // const value = target.getAttribute('data-btn-value');
      // switch (value) {
      //   case 'collapseAction':
      //     return;
      //   case 'removeAction':
      //     return;
      //   default:
      //     return;
      // }
    }

    function onDragStart(event: Event) {
      // console.log('onDrop 2 :>> ', event);
      const target = event.target;
    }

    function onDragOver(event: Event) {
      event.preventDefault();

      const target = event.target;

      const recipePlace = document.querySelector(
        '.crafting-table-recipe-place',
      );
    }

    function onDrop(event: any) {
      const target = event.target;
      // console.log('target 2 :>> ', target);
      const key = event.dataTransfer.getData('key');
      // console.log('key', key);
      const value = event.dataTransfer.getData('value');
      // console.log('value', value);

      if (value === 'RECIPE') {
        startAction('CRAFTING_TABLE__ADD_RECIPE', key);
      }
    }

    function startAction(key: string, value?: any) {
      switch (key) {
        case 'CRAFTING_TABLE__ADD_RECIPE':
          store.dispatch(addRecipe(value));

          const recipeList = store.getState().recipeList[value];
          const ingredientsList = store.getState().ingredientsList;
          const initRecipeListData: any = {};
          Object.entries(recipeList).forEach(([key, val]: any) => {
            initRecipeListData[key] = [0, val, ingredientsList[key]];
          });

          store.dispatch(initRecipeList(initRecipeListData));
          return;

        case 'removeAction':
          return;

        default:
          return;
      }
    }
  }
}
