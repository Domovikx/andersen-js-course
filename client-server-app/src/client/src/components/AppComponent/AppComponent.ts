// @ts-ignore: disable-next-line
import html from './appComponent.html';
import './appComponent.scss';

import { ACTION__PLAYERS__GET_ALL_PLAYERS } from '../../storex/module/players';

import HeaderComponent from '../HeaderComponent';
import MainComponent from '../MainComponent';
import NavComponent from '../NavComponent';
import PlayerAddForm from '../PlayerAddForm';
import PlayerEditForm from '../PlayerEditForm';
import PlayersListComponent from '../PlayersListComponent';

customElements.define('header-component', HeaderComponent);
customElements.define('main-component', MainComponent);
customElements.define('nav-component', NavComponent);
customElements.define('player-add-form', PlayerAddForm);
customElements.define('player-edit-form', PlayerEditForm);
customElements.define('players-list-component', PlayersListComponent);

export class AppComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */

    const renderAppComponent = () => {
      this.innerHTML = html;
    };

    renderAppComponent();

    /** ================= Controller =================
     * Подписка на события и управление
     */

    ACTION__PLAYERS__GET_ALL_PLAYERS();
  }
}
