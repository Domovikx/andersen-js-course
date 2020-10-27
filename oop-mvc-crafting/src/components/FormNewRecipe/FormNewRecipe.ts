import store from '../../redux/helpers/store';

import './formNewRecipe.scss';

import {
  addIngredient,
  clearForm,
  ingredientMinus,
  ingredientPlus,
  ingredientRemove,
} from '../../redux/modules/formNewRecipe/formNewRecipeAction';
import { recipeListAdd } from '../../redux/modules/recipeList/recipeListAction';

export class FormNewRecipe extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const self = this;

    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */
    const ingredientsList = store.getState().ingredientsList;
    const formNewRecipeState = store.getState().formNewRecipe;

    const renderView = (ingredientsList: any, formNewRecipeState: any) => {
      const ingredientsKeys = Object.keys(ingredientsList);

      this.innerHTML = `
          <h3 data-btn-key="COLLAPSE_ACTION">
            Adding a new recipe
          </h3>

          <div class="collapse show">
            <form id="form_new_recipe">
              <div class="input-group mb-1">
                <select class="custom-select select-ingredient" name="select_ingredient">
                  ${ingredientsKeys.map(
                    (key) =>
                      `
                        <option value="${key}"> ${key}</option>
                      `,
                  )}
                </select>

                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    data-btn-key="FORM_NEW_RECIPE__ADD_INGREDIENT"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div class="input-group mb-1">
                <input
                  name="recipe_name"
                  type="Name"
                  class="form-control recipe-name"
                  placeholder="Add new recipe name"
                  aria-label="Form to new recipe"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    data-btn-key="RECIPE_LIST__ADD"
                  >
                    Add recipe
                  </button>
                  <button
                    class="btn btn-outline-secondary material-icons"
                    data-btn-key="FORM_NEW_RECIPE__CLEAR_FORM"
                  >
                    delete_sweep
                  </button>
                </div>
              </div>
            </form>

            <ul class="list-group" id="pre_list_ingredients">
              ${Object.entries(formNewRecipeState)
                .map(
                  ([key, val]) =>
                    `
                    <li class="list-group-item">
                      ${key} : ${val}

                      <span class="btn-group">
                        <button
                          class="btn btn-lg material-icons"
                          data-btn-value="${key}"
                          data-btn-key="FORM_NEW_RECIPE__INGREDIENT_PLUS"
                        >
                          add_box
                        </button>
                        <button
                          class="btn btn-lg material-icons"
                          data-btn-value="${key}"
                          data-btn-key="FORM_NEW_RECIPE__INGREDIENT_MINUS"
                        >
                          indeterminate_check_box
                        </button>
                        <button
                          class="btn btn-lg material-icons"
                          data-btn-value="${key}"
                          data-btn-key="FORM_NEW_RECIPE__INGREDIENT_REMOVE"
                        >
                          delete_sweep
                        </button>
                      </span>
                    </li>
                  `,
                )
                .join('')}
            </ul>
          </div>
        `;
    };

    renderView(ingredientsList, formNewRecipeState);

    // Подписывапемся на обновление стейта
    store.subscribe(() => {
      const ingredientsList = store.getState().ingredientsList;
      const formNewRecipeState = store.getState().formNewRecipe;
      renderView(ingredientsList, formNewRecipeState);
    });

    /** ================= Controller =================
     * Подписка на события и управление
     */

    this.addEventListener('click', onAction, false);

    function onAction(event: Event | any) {
      event.preventDefault();
      const target: Element = event.target;
      const key: string | null = target.getAttribute('data-btn-key');
      const btnValue: string | null = target.getAttribute('data-btn-value');

      let recipeKey: any;
      let recipeNameEl: any;
      let recipeValue;

      switch (key) {
        case 'COLLAPSE_ACTION':
          const collapseElement: any = self.querySelector(`.collapse`);
          if (collapseElement.classList.contains('show')) {
            collapseElement.classList.remove('show');
          } else {
            collapseElement.classList.add('show');
          }
          return;

        case 'FORM_NEW_RECIPE__ADD_INGREDIENT':
          let selectIngredientEl: any = self.querySelector(
            '.select-ingredient',
          );
          recipeKey = selectIngredientEl.value;
          store.dispatch(addIngredient(recipeKey));
          return;

        case 'RECIPE_LIST__ADD':
          recipeNameEl = self.querySelector('.recipe-name');
          recipeKey = recipeNameEl.value;
          if (!recipeKey) return alert('нужно добавить имя');
          recipeValue = store.getState().formNewRecipe;
          if (Object.keys(recipeValue).length === 0)
            return alert('нужно добавить ингридиенты');

          if (store.getState().recipeList[recipeKey]) {
            if (confirm(`${recipeKey} - уже существует, перезаписать ?`)) {
              store.dispatch(recipeListAdd(recipeKey, recipeValue));
            }
            return;
          }

          store.dispatch(recipeListAdd(recipeKey, recipeValue));
          return;

        case 'FORM_NEW_RECIPE__CLEAR_FORM':
          const recipeName: any = self.querySelector('.recipe-name');
          recipeName.value = '';
          store.dispatch(clearForm());
          return;

        case 'FORM_NEW_RECIPE__INGREDIENT_PLUS':
          store.dispatch(ingredientPlus(btnValue));
          return;

        case 'FORM_NEW_RECIPE__INGREDIENT_MINUS':
          store.dispatch(ingredientMinus(btnValue));
          return;

        case 'FORM_NEW_RECIPE__INGREDIENT_REMOVE':
          store.dispatch(ingredientRemove(btnValue));
          return;

        default:
          return;
      }
    }
  }
}
