import store from '../../redux/helpers/store';
import { html, render } from 'lit-html';

import './recipeList.scss';
import {
  recipeListRemove,
  recipeListPlus,
  recipeListMinus,
} from '../../redux/modules/recipeList/recipeListAction';

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
                data-btn-value="COLLAPSE_ACTION"
                data-btn-key=${key}
              >
                <span class="content-text">${key}</span>
                <span class="btn-group">
                  <button
                    class="btn btn-lg material-icons"
                    data-btn-value="RECIPE_LIST__REMOVE"
                    data-btn-key=${key}
                  >
                    delete_sweep
                  </button>
                </span>
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
                        <li>
                          <span class="content-text">
                            ${name} : ${value}
                          </span>
                          <span class="btn-group">
                            <button
                              class="btn btn-lg material-icons"
                              data-btn-value="RECIPE_LIST__PLUS"
                              data-btn-key=${key}
                              data-btn-item=${name}
                            >
                              add_box
                            </button>

                            <button
                              class="btn btn-lg material-icons"
                              data-btn-value="RECIPE_LIST__MINUS"
                              data-btn-key=${key}
                              data-btn-item=${name}
                            >
                              indeterminate_check_box
                            </button>
                          </span>
                        </li>
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
          ${Object.keys(recipeList).length !== 0
            ? html`
                <h3>Recipe List</h3>
              `
            : ''}
          ${itemTemplates}
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
    this.addEventListener('dragstart', onDragStart);

    function onClick(event: Event | any) {
      const target: Element = event.target;

      const key = target.getAttribute('data-btn-key');
      const value = target.getAttribute('data-btn-value');
      const item = target.getAttribute('data-btn-item');

      switch (value) {
        case 'COLLAPSE_ACTION':
          const collapseElement: any = document.querySelector(
            `recipe-list [data-collapse="${key}"]`,
          );
          if (collapseElement.classList.contains('show')) {
            collapseElement.classList.remove('show');
          } else {
            collapseElement.classList.add('show');
          }
          return;

        case 'RECIPE_LIST__REMOVE':
          if (confirm(`Вы уверены, удалить "${key}" ?`)) {
            store.dispatch(recipeListRemove(key));
          }
          return;

        case 'RECIPE_LIST__PLUS':
          store.dispatch(recipeListPlus(key, item));
          return;

        case 'RECIPE_LIST__MINUS':
          store.dispatch(recipeListMinus(key, item));
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
