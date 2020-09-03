export default class CraftingTable extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = 'CraftingTable';
  }
}
