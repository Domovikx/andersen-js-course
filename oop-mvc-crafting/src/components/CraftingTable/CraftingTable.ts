import store from '../../redux/helpers/store';

import './craftingTable.scss';

import {
  addRecipe,
  initRecipeList,
  clearForm,
  addIngredient,
} from '../../redux/modules/craftingTable/craftingTableAction';
import { readyListAdd } from '../../redux/modules/readyList/readyListAction';
import {
  ingredientListUpdate,
  REMOVE_ITEMS,
} from '../../redux/modules/ingredientsList/ingredientsListAction';

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

      this.innerHTML = `
          <h3 data-btn-key="COLLAPSE_ACTION">
            Crafting Table
          </h3>

          <div class="collapse show">
            <div class="input-group">
              <span class="card recipe-field" data-place-key="RECIPE_INPUT">
                ${craftingTable.recipeName}
              </span>

              <span class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  data-btn-key="READY_LIST__ADD"
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
              ${Object.entries(recipeList)
                .map(([key, { exists, required }]: any) => {
                  console.log('key :>> ', key);
                  const template = `
                    <li
                      class="list-group-item ingredient-field"
                      data-place-key="${key}"
                    >
                      ${key} :
                      ${
                        exists <= ingredientsList[key]
                          ? exists
                          : ingredientsList[key]
                      }
                      из ${required} (${ingredientsList[key]})

                      <span class="btn-group">
                        <button
                          class="btn btn-lg material-icons"
                          data-btn-value="${key}"
                          data-btn-key="FORM_NEW_RECIPE__INGREDIENT_PLUS"
                        >
                          add_box
                        </button>
                      </span>
                    </li>
                  `;

                  return template;
                })
                .join('')}
            </ul>
          </div>
        `;
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
      console.log('key', key);
      const value = target.getAttribute('data-btn-value');
      console.log('value', value);

      startAction(key, value);
    }

    function onDragOver(event: any) {
      event.preventDefault();
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
      let ingredientsList: any;
      let state: any;
      let recipeList: any;
      let recipeName: any;
      let initRecipeListData: any;
      let rootRecipeList: any;
      let stock: any;

      switch (key) {
        case 'COLLAPSE_ACTION':
          const collapseElement: any = document.querySelector(
            `crafting-table .collapse`,
          );
          if (collapseElement.classList.contains('show')) {
            collapseElement.classList.remove('show');
          } else {
            collapseElement.classList.add('show');
          }
          return;

        case 'CRAFTING_TABLE__ADD_RECIPE':
          store.dispatch(addRecipe(value));
          state = store.getState();
          recipeList = state.recipeList[value];
          initRecipeListData = {};
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
          ingredientsList = store.getState().ingredientsList;
          store.dispatch(addIngredient(value, ingredientsList));
          return;

        case 'READY_LIST__ADD':
          state = store.getState();
          recipeName = state.craftingTable.recipeName;
          recipeList = state.craftingTable.recipeList;
          rootRecipeList = state.recipeList[recipeName];
          stock = state.ingredientsList;

          if (recipeName === '') {
            return alert(`Нужно добавить рецепт, перетяните его на стол`);
          }

          const isAlert = Object.entries(recipeList).some(
            ([key, { exists, required }]: any) => {
              const inStock = stock[key];
              if (inStock < exists) {
                alert(`${key} - недостаточно на складе. Добавьте склад.`);
                return true;
              }
              if (exists < required) {
                alert(`${key} - недостаточно на столе. Добавьте еще.`);
                return true;
              }
            },
          );
          if (isAlert) return;

          store.dispatch(readyListAdd(recipeName, rootRecipeList));
          store.dispatch(ingredientListUpdate(rootRecipeList, REMOVE_ITEMS));
          return;

        default:
          return;
      }
    }
  }
}
