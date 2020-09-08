import store from '../../redux/helpers/store';
import { html, render } from 'lit-html';

import './ingredientsList.scss';

import {
  ingredientListPlus,
  ingredientListMinus,
  ingredientListRemove,
} from '../../redux/modules/ingredientsList/ingredientsListAction';

export class IngredientsList extends HTMLElement {
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
            <li data-key=${key} draggable="true" class="list-group-item">
              <span class="content-text">${key} : ${ingredientsList[key]}</span>
              <span class="btn-group">
                <button
                  class="btn btn-lg material-icons"
                  data-btn-value="INGREDIENT_LIST__PLUS"
                  data-btn-key=${key}
                >
                  add_box
                </button>
                <button
                  class="btn btn-lg material-icons"
                  data-btn-value="INGREDIENT_LIST__MINUS"
                  data-btn-key=${key}
                >
                  indeterminate_check_box
                </button>
                <button
                  class="btn btn-lg material-icons"
                  data-btn-value="INGREDIENT_LIST__REMOVE"
                  data-btn-key=${key}
                >
                  delete_sweep
                </button>
              </span>
            </li>
          `,
        );
      }

      render(
        html`
          <h3>Ingredients list</h3>
          <ul class="list-group">
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
    this.addEventListener('dragstart', onDragStart);

    function onClick(event: Event | any) {
      const target: Element = event.target;

      const key = target.getAttribute('data-btn-key');
      const value = target.getAttribute('data-btn-value');

      switch (value) {
        case 'INGREDIENT_LIST__PLUS':
          store.dispatch(ingredientListPlus(key));
          return;

        case 'INGREDIENT_LIST__MINUS':
          store.dispatch(ingredientListMinus(key));
          return;

        case 'INGREDIENT_LIST__REMOVE':
          if (confirm(`Вы уверены, удалить "${key}" ?`)) {
            store.dispatch(ingredientListRemove(key));
          }
          return;

        default:
          return;
      }
    }

    function onDragStart(event: any) {
      const target = event.target;
      const key = target.getAttribute('data-key');
      event.dataTransfer.setData('key', key);
      event.dataTransfer.setData('value', 'INGREDIENT');
    }

    /** ================= Model =================
     * Управление состоянием и стейтом
     * даже и не знаю что сюда в моем случае написать,
     * может быть имеет смысл сюда вынести switch (value) ...
     */
  }
}
