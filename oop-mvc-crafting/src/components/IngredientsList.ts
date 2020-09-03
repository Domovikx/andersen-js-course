import store from '../redux/helpers/store';

import { html, render } from 'lit-html';

import {
  ingredientListPlus,
  ingredientListMinus,
  ingredientListRemove,
} from '../redux/modules/ingredientsList/ingredientsListAction';

export default class IngredientsList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */
    const ingredientsList = store.getState().ingredientsList;

    const renderView = (ingredientsList: any) => {
      const itemTemplates = [];
      for (let key in ingredientsList) {
        itemTemplates.push(
          html`
            <li data-id=${key} draggable="true">
              ${key} : ${ingredientsList[key]}
              <div class="btn-group">
                <button
                  class="btn btn-lg material-icons"
                  data-btn-value="plus"
                  data-btn-key=${key}
                >
                  add_box
                </button>
                <button
                  class="btn btn-lg material-icons"
                  data-btn-value="minus"
                  data-btn-key=${key}
                >
                  indeterminate_check_box
                </button>
                <button
                  class="btn btn-lg material-icons"
                  data-btn-value="remove"
                  data-btn-key=${key}
                >
                  delete_sweep
                </button>
              </div>
            </li>
          `,
        );
      }

      render(
        html`
          <ul>
            ${itemTemplates}
          </ul>
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

    this.addEventListener('click', onClick);

    function onClick(event: Event | any) {
      const target: Element = event.target;

      const key = target.getAttribute('data-btn-key');
      const value = target.getAttribute('data-btn-value');

      switch (value) {
        case 'plus':
          store.dispatch(ingredientListPlus(key));
          return;

        case 'minus':
          store.dispatch(ingredientListMinus(key));
          return;

        case 'remove':
          store.dispatch(ingredientListRemove(key));
          return;

        default:
          return;
      }
    }

    /** ================= Model =================
     * Управление состоянием и стейтом
     * даже и не знаю что сюда в моем случае написать,
     * может быть имеет смысл сюда вынести switch (value) ...
     */
  }
}
