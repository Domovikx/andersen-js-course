// @ts-ignore: disable-next-line
import html from './mainComponent.html';
import './mainComponent.scss';

export class MainComponent extends HTMLElement {
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
