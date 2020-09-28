// @ts-ignore: disable-next-line
// import html from './routerOutlet.html';
import './routerOutlet.scss';

export class RouterOutlet extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const self = this;

    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */

    const renderRouterOutlet = (tag?: any) => {
      console.log('tag :>> ', tag);
      this.innerHTML = tag || `Well let's play :)`;
    };

    /** ================= Controller =================
     * Подписка на события и управление
     */

    function init() {
      window.addEventListener('hashchange', routerHandler);
      routerHandler();
    }
    init();

    function getRouterInfo() {
      const hash = location.hash ? location.hash.slice(1) : '';
      const [rout, id] = hash.split('/');
      return { rout, id };
    }

    function routerHandler() {
      const { rout, id } = getRouterInfo();
      const routes: any = {
        'players-list': '<players-list-component></players-list-component>',
        'player-edit': `<player-edit-form data-key="${id}"></player-edit-form>`,
        combat: '<combat-component></combat-component>',
      };
      renderRouterOutlet(routes[rout]);
    }
  }
}
