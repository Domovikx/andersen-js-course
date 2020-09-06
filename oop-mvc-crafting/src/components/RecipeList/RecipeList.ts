import store from '../../redux/helpers/store';
import { html, render } from 'lit-html';

import './recipeList.scss';
import { recipeListRemove } from '../../redux/modules/recipeList/recipeListAction';

export class RecipeList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */
    const recipeList = store.getState().recipeList;

    const renderView = (recipeList: any) => {
      const itemTemplates = [];
      for (let key in recipeList) {
        itemTemplates.push(
          html`
            <div class="card">
              <div
                class="card-header"
                draggable="true"
                data-btn-value="collapseAction"
                data-btn-key=${key}
              >
                ${key}
                <button
                  class="btn btn-lg material-icons"
                  data-btn-value="removeAction"
                  data-btn-key=${key}
                >
                  delete_sweep
                </button>
              </div>

              <div
                class="collapse card-body"
                aria-labelledby="headingOne"
                data-collapse=${key}
              >
                <ul>
                  ${Object.entries(recipeList[key]).map(
                    ([name, value]) =>
                      html`
                        <li>${name} : ${value}</li>
                      `,
                  )}
                </ul>
              </div>
            </div>
          `,
        );
      }

      render(
        html`
          <h3>Recipe List</h3>
          <div>
            ${itemTemplates}
          </div>
        `,
        this,
      );
    };

    renderView(recipeList);

    // Подписывапемся на обновление стейта
    store.subscribe(() => {
      const state = store.getState();
      renderView(state.recipeList);
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
  }
}
