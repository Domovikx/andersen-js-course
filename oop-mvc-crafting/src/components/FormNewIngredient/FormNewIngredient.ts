import store from '../../redux/helpers/store';

import './formNewIngredient.scss';

import { ingredientListAdd } from '../../redux/modules/formNewIngredient/formNewIngredientAction';

export class FormNewIngredient extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */

    const renderView = () => {
      this.innerHTML = `
          <h3 data-action="COLLAPSE_ACTION">
            Adding a new ingredient
          </h3>

          <div class="collapse show">
            <form>
              <div class="input-group mb-3">
                <input
                  name="ingredient_name"
                  type="text"
                  class="form-control ingredient-name"
                  placeholder="Add new ingredient"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="btn-add-new-ingredient"
                    data-action="INGREDIENT_LIST__ADD"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        `;
    };

    renderView();

    // Подписывапемся на обновление стейта
    store.subscribe(() => {
      renderView();
    });

    /** ================= Controller =================
     * Подписка на события и управление
     */

    this.addEventListener('click', onAction);
    this.addEventListener('submit', onAction); // TODO: не должно работать!

    function onAction(event: Event | any) {
      event.preventDefault();
      const action: any = event.target.getAttribute('data-action');
      const formNewIngredient: any = document.querySelector(
        'form-new-ingredient .ingredient-name',
      );
      const ingredientName = formNewIngredient.value;

      switch (action) {
        case 'INGREDIENT_LIST__ADD':
          if (!ingredientName) {
            return alert('Нужно добавить название ингредиента');
          }

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
          return;

        case 'COLLAPSE_ACTION':
          const collapseElement: any = document.querySelector(
            `form-new-ingredient .collapse`,
          );
          if (collapseElement.classList.contains('show')) {
            collapseElement.classList.remove('show');
          } else {
            collapseElement.classList.add('show');
          }
          return;

        default:
          return;
      }
    }
  }
}
