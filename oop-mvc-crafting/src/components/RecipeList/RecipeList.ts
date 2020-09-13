import store from '../../redux/helpers/store';

import './recipeList.scss';
import {
  recipeListRemove,
  recipeListPlus,
  recipeListMinus,
} from '../../redux/modules/recipeList/recipeListAction';
import {
  RECIPE_LIST,
  SHOW_OFF,
  SHOW_ON,
} from '../../redux/modules/view/viewTypes';
import { viewShow } from '../../redux/modules/view/viewAction';

export class RecipeList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */
    const state = store.getState();

    const renderView = (recipeList: any, view: any) => {
      const itemTemplates = [];
      const viewShow = view.show;
      const viewList = view.list;

      for (let key in recipeList) {
        const itemShow = viewList[key] ? 'show' : '';

        itemTemplates.push(
          `
            <div class="card">
              <div
                class="card-header"
                draggable="true"
                data-btn-value="COLLAPSE_ACTION"
                data-btn-key="${key}"
                data-show="${itemShow}"
              >
                <span class="content-text">${key}</span>
                <span class="btn-group">
                  <button
                    class="btn btn-lg material-icons"
                    data-btn-value="RECIPE_LIST__REMOVE"
                    data-btn-key="${key}"
                  >
                    delete_sweep
                  </button>
                </span>
              </div>

              <div
                class="collapse ${itemShow} card-body"
                aria-labelledby="headingOne"
                data-collapse="${key}"
              >
                <ul>
                  ${Object.entries(recipeList[key])
                    .map(
                      ([name, value]) =>
                        `
                        <li>
                          <span class="content-text">
                            ${name} : ${value}
                          </span>
                          <span class="btn-group">
                            <button
                              class="btn btn-lg material-icons"
                              data-btn-value="RECIPE_LIST__PLUS"
                              data-btn-key="${key}"
                              data-btn-item="${name}"
                            >
                              add_box
                            </button>

                            <button
                              class="btn btn-lg material-icons"
                              data-btn-value="RECIPE_LIST__MINUS"
                              data-btn-key="${key}"
                              data-btn-item="${name}"
                            >
                              indeterminate_check_box
                            </button>
                          </span>
                        </li>
                      `,
                    )
                    .join('')}
                </ul>
              </div>
            </div>
          `,
        );
      }

      this.innerHTML = `
          ${
            Object.keys(recipeList).length !== 0
              ? `
                <h3
                  data-btn-value="COLLAPSE_ACTION"
                  data-show="${viewShow}"
                >
                  Recipe List
                </h3>
              `
              : ''
          }

          <div class="collapse ${viewShow}">
            ${itemTemplates.join('')}
          </div>
        `;
    };

    renderView(state.recipeList, state.view[RECIPE_LIST]);

    // Подписывапемся на обновление стейта
    store.subscribe(() => {
      const state = store.getState();
      renderView(state.recipeList, state.view[RECIPE_LIST]);
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
      const item = target.getAttribute('data-btn-item');
      const dataShow = target.getAttribute('data-show');

      let action;

      switch (value) {
        case 'COLLAPSE_ACTION':
          action = dataShow === 'show' ? SHOW_OFF : SHOW_ON;
          store.dispatch(viewShow(RECIPE_LIST, action, key));
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

      const recipeField: any = document.querySelector(
        'crafting-table .recipe-field',
      );
      recipeField.classList.add('backlight');
    }

    function onDragEnd() {
      const recipeField: any = document.querySelector(
        'crafting-table .recipe-field',
      );
      recipeField.classList.remove('backlight');
    }
  }
}
