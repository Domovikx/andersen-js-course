// @ts-ignore: disable-next-line
import html from './combatComponent.html';
import './combatComponent.scss';

export class CombatComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = html;
  }
}
