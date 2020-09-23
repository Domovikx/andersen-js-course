// @ts-ignore: disable-next-line
import html from './navComponent.html';
import './navComponent.scss';

export class NavComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = html;
  }
}
