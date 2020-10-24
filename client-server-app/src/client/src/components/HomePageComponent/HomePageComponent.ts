// @ts-ignore: disable-next-line
import html from './homePageComponent.html';
import './homePageComponent.scss';

export class HomePageComponent extends HTMLElement {
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
  private controller(): void {}
}
