import store from '../redux/helpers/store';

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
    const self = this; // ну вот я и дожил до этого, что self пишу...

    function render(ingredientsList: any) {
      const ul = document.createElement('ul');

      for (let key in ingredientsList) {
        const li = document.createElement('li');
        li.dataset.id = `${key}`;
        li.setAttribute('draggable', 'true');
        ul.appendChild(li);
        li.innerHTML =
          `${key} : ${ingredientsList[key]} ` +
          `<div class="btn-group">` +
          `<button class="btn btn-lg material-icons" data-btn-value = "plus" data-btn-key=${key}>` +
          `add_box` +
          `</button> ` +
          `<button class="btn btn-lg material-icons" data-btn-value = "minus" data-btn-key=${key}>` +
          `indeterminate_check_box` +
          `</button> ` +
          `<button class="btn btn-lg material-icons" data-btn-value = "remove" data-btn-key=${key}>` +
          `delete_sweep` +
          `</button>` +
          `</div>`;
      }

      self.innerHTML = `<h3>IngredientsList</h3>`;
      self.appendChild(ul);
    }

    render(ingredientsList);

    // Подписывапемся на обновление стейта
    store.subscribe(() => {
      const state = store.getState();
      render(state.ingredientsList);
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
     * даже и не знаю что сюда написать,
     * может быть имеет смысл сюда вынести switch (value) ...
     */
  }
}
