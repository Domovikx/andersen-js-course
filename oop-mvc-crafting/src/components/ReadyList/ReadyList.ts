import store from '../../redux/helpers/store';

import './readyList.scss';
import { readyListRemove } from '../../redux/modules/readyList/readyListAction';
import {
  ingredientListUpdate,
  ADD_ITEMS,
} from '../../redux/modules/ingredientsList/ingredientsListAction';

export class ReadyList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const self = this;

    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */
    const state = store.getState();

    const renderView = (readyList: any) => {
      this.innerHTML = `
          ${
            Object.keys(readyList).length !== 0
              ? `
                <h3
                  data-btn-value="COLLAPSE_ACTION"
                  data-btn-key="COLLAPSE_BLOCK"
                >
                  Ready List
                </h3>
              `
              : ''
          }
          <div class="collapse show" data-collapse="COLLAPSE_BLOCK">
            ${Object.entries(readyList)
              .map(([key, { count, recipeList }]: any) => {
                return `
                  <div class="card">
                    <div
                      class="card-header"
                      data-btn-value="COLLAPSE_ACTION"
                      data-btn-key="${key}"
                    >
                      <span class="content-text">${key} : ${count}</span>
                      <span class="btn-group">
                        <button
                          class="btn btn-lg material-icons"
                          data-btn-value="READY_LIST__REMOVE"
                          data-btn-key="${key}"
                        >
                          delete_sweep
                        </button>

                        <button
                          class="btn btn-lg material-icons"
                          data-btn-value="READY_LIST__DISASSEMBLE"
                          data-btn-key="${key}"
                        >
                          gavel
                        </button>
                      </span>
                    </div>

                    <div>
                      <div
                        class="collapse card-body"
                        aria-labelledby="headingOne"
                        data-collapse="${key}"
                      >
                        <ul>
                          ${Object.entries(recipeList)
                            .map(
                              ([name, value]) =>
                                `
                                <li>${name} : ${value}</li>
                              `,
                            )
                            .join('')}
                        </ul>
                      </div>
                    </div>
                  </div>
                `;
              })
              .join('')}
          </div>
        `;
    };

    renderView(state.readyList);

    // Подписывапемся на обновление стейта
    store.subscribe(() => {
      const state = store.getState();
      renderView(state.readyList);
    });

    /** ================= Controller =================
     * Подписка на события и управление
     */

    this.addEventListener('click', onAction);

    function onAction(event: Event | any) {
      const target: Element = event.target;
      const key: any = target.getAttribute('data-btn-key');
      const value = target.getAttribute('data-btn-value');

      let state;
      let recipeList;

      switch (value) {
        case 'COLLAPSE_ACTION':
          const collapseElement: any = self.querySelector(
            `[data-collapse="${key}"]`,
          );
          if (collapseElement.classList.contains('show')) {
            collapseElement.classList.remove('show');
          } else {
            collapseElement.classList.add('show');
          }
          return;

        case 'READY_LIST__REMOVE':
          store.dispatch(readyListRemove(key));
          return;

        case 'READY_LIST__DISASSEMBLE':
          state = store.getState();
          recipeList = state.readyList[key].recipeList;
          store.dispatch(ingredientListUpdate(recipeList, ADD_ITEMS));
          store.dispatch(readyListRemove(key));
          return;

        default:
          return;
      }
    }
  }
}
