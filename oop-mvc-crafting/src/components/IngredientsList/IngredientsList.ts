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
          ${Object.keys(ingredientsList).length !== 0
            ? html`
                <h3
                  data-btn-value="COLLAPSE_ACTION"
                  data-btn-key="COLLAPSE_BLOCK"
                >
                  Ingredients list
                </h3>
              `
            : ''}
          <div class="collapse show" data-collapse="COLLAPSE_BLOCK">
            <ul class="list-group overflow-auto">
              ${itemTemplates}
            </ul>
          </div>
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
    this.addEventListener('dragend', onDragEnd);

    function onClick(event: Event | any) {
      const target: Element = event.target;

      const key = target.getAttribute('data-btn-key');
      const value = target.getAttribute('data-btn-value');

      switch (value) {
        case 'COLLAPSE_ACTION':
          const collapseElement: any = document.querySelector(
            `ingredients-list [data-collapse="${key}"]`,
          );
          if (collapseElement.classList.contains('show')) {
            collapseElement.classList.remove('show');
          } else {
            collapseElement.classList.add('show');
          }
          return;

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
      const dt = event.dataTransfer;
      dt.setData('key', key);
      dt.setData('value', 'INGREDIENT');

      const ingredientField: any =
        document.querySelector(`crafting-table [data-place-key=${key}]`) ||
        null;
      // TODO: Узнать как валидировать document.querySelector при undefined
      // точнее при не нахождении элемента
      if (ingredientField) {
        ingredientField.classList.add('backlight');
      }
    }

    function onDragEnd() {
      const ingredientField: any = document.querySelector(
        `crafting-table .backlight`,
      );
      ingredientField.classList.remove('backlight');
    }
  }
}
