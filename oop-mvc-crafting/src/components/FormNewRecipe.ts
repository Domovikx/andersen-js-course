export default class FormNewRecipe extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = 'FormNewRecipe';
  }
}
