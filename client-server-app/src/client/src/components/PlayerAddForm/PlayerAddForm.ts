import { ACTION__PLAYERS__CREATE_PLAYER } from '../../storex/module/players';
// @ts-ignore: disable-next-line
import html from './playerAddForm.html';
import './playerAddForm.scss';

export class PlayerAddForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = html;

    const btn = this.querySelector('.btn');

    btn?.addEventListener('click', () => {
      console.log('click :>> ');
      onCreatePlayer();
    });

    function onCreatePlayer() {
      ACTION__PLAYERS__CREATE_PLAYER();
    }
  }
}
