// @ts-ignore: disable-next-line
import html from './playerAddForm.html';
import './playerAddForm.scss';

export class PlayerAddForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = html;
  }
}
