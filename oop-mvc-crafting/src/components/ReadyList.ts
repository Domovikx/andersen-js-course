export default class ReadyList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = 'ReadyList';
  }
}