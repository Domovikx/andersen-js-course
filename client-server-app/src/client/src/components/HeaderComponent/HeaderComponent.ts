// @ts-ignore: disable-next-line
import html from './headerComponent.html';
import './headerComponent.scss';

export class HeaderComponent extends HTMLElement {
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
  private controller(): void {}
}
