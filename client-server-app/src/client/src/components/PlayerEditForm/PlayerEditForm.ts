// @ts-ignore: disable-next-line
import html from './playerEditForm.html';
import './playerEditForm.scss';

export class PlayerEditForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = html;

    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */

    /** ================= Controller =================
     * Подписка на события и управление
     */

    function init() {
      // addEventListener('hashchange', routerHandler);
      // routerHandler();
    }
    init();
  }
}
