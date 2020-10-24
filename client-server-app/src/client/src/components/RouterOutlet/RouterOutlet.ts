// @ts-ignore: disable-next-line
import html from './routerOutlet.html';
import './routerOutlet.scss';

export class RouterOutlet extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.view();
    this.controller();
  }

  //** **************** view ********************** */
  private view(): void {
    this.innerHTML = html;
  }

  //** **************** controller **************** */
  private controller(): void {
    const self = this;

    window.addEventListener('hashchange', routerHandler);
    routerHandler();

    function routerHandler(): void {
      const { rout, id } = getRouterInfo();
      const routes: any = {
        '': '<home-page-component></home-page-component>',
        'players-list': '<players-list-component></players-list-component>',
        'player-edit': `<player-edit-form data-key="${id}"></player-edit-form>`,
        combat: '<combat-component></combat-component>',
      };
      setRoutTag(routes[rout]);
    }

    function getRouterInfo(): { rout: string; id: string } {
      const hash = location.hash ? location.hash.slice(1) : '';
      const [rout, id] = hash.split('/');
      return { rout, id };
    }

    function setRoutTag(tag: string): void {
      self.innerHTML = tag;
    }
  }
}
