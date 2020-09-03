export default class RecipeList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = 'RecipeList';
  }
}
