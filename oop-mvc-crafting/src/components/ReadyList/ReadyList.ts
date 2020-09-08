import store from '../../redux/helpers/store';
import { html, render } from 'lit-html';

import './readyList.scss';

export class ReadyList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */
    const recipeList = store.getState().recipeList;

    const renderView = () => {
      render(
        html`
          <h3>Recipe List</h3>

          <ul class="list-group" id="pre_list_ingredients">
            123
          </ul>
        `,
        this,
      );
    };

    renderView();

    // Подписывапемся на обновление стейта
    store.subscribe(() => {
      const state = store.getState();
      renderView();
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
        case 'collapseAction':
          const collapseElement: any = document.querySelector(
            `[data-collapse="${key}"]`,
          );
          if (collapseElement.classList.contains('show')) {
            collapseElement.classList.remove('show');
          } else {
            collapseElement.classList.add('show');
          }
          return;

        case 'removeAction':
          if (confirm(`Вы уверены, удалить "${key}" ?`)) {
            store.dispatch(recipeListRemove(key));
          }
          return;

        default:
          return;
      }
    }

    function onDragStart(event: any) {
      const target = event.target;
      const key = target.getAttribute('data-btn-key');
      event.dataTransfer.setData('key', key);
      event.dataTransfer.setData('value', 'RECIPE');
    }
  }
}
