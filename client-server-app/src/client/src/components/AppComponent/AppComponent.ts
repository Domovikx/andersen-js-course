// @ts-ignore: disable-next-line
import html from './appComponent.html';
import './appComponent.scss';

import { ACTION__PLAYERS__GET_ALL_PLAYERS } from '../../storex/module/players';

import RouterOutlet from '../RouterOutlet';

import HeaderComponent from '../HeaderComponent';
import MainComponent from '../MainComponent';
import NavComponent from '../NavComponent';
import PlayerEditForm from '../PlayerEditForm';
import PlayersListComponent from '../PlayersListComponent';
import CombatComponent from '../CombatComponent';
import HomePageComponent from '../HomePageComponent';

customElements.define('router-outlet', RouterOutlet);

customElements.define('header-component', HeaderComponent);
customElements.define('main-component', MainComponent);
customElements.define('nav-component', NavComponent);
customElements.define('player-edit-form', PlayerEditForm);
customElements.define('players-list-component', PlayersListComponent);
customElements.define('combat-component', CombatComponent);
customElements.define('home-page-component', HomePageComponent);

export class AppComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.view();
    this.controller();
  }

  //** **************** view **************** */
  private view(): void {
    this.innerHTML = html;
  }

  //** **************** controller **************** */
  private controller(): void {
    ACTION__PLAYERS__GET_ALL_PLAYERS();
  }
}
