// @ts-ignore: disable-next-line
import html from './playerEditForm.html';
import './playerEditForm.scss';

export class PlayerEditForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = html;
  }
}
