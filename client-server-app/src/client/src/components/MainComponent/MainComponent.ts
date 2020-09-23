// @ts-ignore: disable-next-line
import html from './mainComponent.html';
import './mainComponent.scss';

export class MainComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */

    const renderView = () => {
      this.innerHTML = html;
    };

    renderView();

    /** ================= Controller =================
     * Подписка на события и управление
     */

    this.addEventListener('storage', onAction);

    function onAction(event: Event | any) {
      event.preventDefault();
      const action = 'PLAYER__ADD';

      switch (action) {
        case 'PLAYER__ADD':
          return;

        default:
          return;
      }
    }

    /** ================= Model =================
     * Получение данных с серверной части, работа с данными
     */
  }
}
