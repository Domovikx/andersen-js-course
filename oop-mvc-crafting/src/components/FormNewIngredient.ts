import store from '../redux/helpers/store';
import { html, render } from 'lit-html';

import { ingredientListAdd } from '../redux/modules/formNewIngredient/formNewIngredientAction';

export default class FormNewIngredient extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = 'FormNewIngredient';

    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */
    const ingredientsList = store.getState().ingredientsList;

    const renderView = (ingredientsList: any) => {
      render(
        html`
          <form id="form-new-ingredient">
            <div class="input-group mb-3">
              <input
                name="ingredient_name"
                type="Name"
                class="form-control"
                placeholder="Add new ingredient"
                aria-label="Form to new ingredient"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="btn-add-new-ingredient"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        `,
        this,
      );
    };

    renderView(ingredientsList);

    // Подписывапемся на обновление стейта
    store.subscribe(() => {
      const state = store.getState();
      renderView(state.ingredientsList);
    });

    /** ================= Controller =================
     * Подписка на события и управление
     */

    const btnAddNewIngredient: any = document.getElementById(
      'btn-add-new-ingredient',
    );
    const FormNewIngredient: any = document.getElementById(
      'form-new-ingredient',
    );

    btnAddNewIngredient.addEventListener('click', onClick);

    function onClick(event: Event | any) {
      const target: Element = event.target;
      const ingredientName: string = FormNewIngredient.ingredient_name.value;

      const isIngredientNameExist = () => {
        const ingredientsList = store.getState().ingredientsList;
        return ingredientsList.hasOwnProperty([ingredientName]);
      };

      if (!isIngredientNameExist()) {
        store.dispatch(ingredientListAdd(ingredientName));
      } else {
        if (
          confirm(
            `Ингридиент "${ingredientName}" уже существует, перезаписать ?`,
          )
        ) {
          store.dispatch(ingredientListAdd(ingredientName));
        }
      }
    }
  }
}
