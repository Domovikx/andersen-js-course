import './app.scss';

// import IngredientsList from './components/IngredientsList';

export class App extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // customElements.define('ingredients-list', IngredientsList);

    this.innerHTML = `TEST - App`;
  }
}
