// @ts-ignore: disable-next-line
import html from './playersListComponent.html';
import './playersListComponent.scss';

export class PlayersListComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = html;
  }
}
