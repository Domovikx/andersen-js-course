import { ACTION__PLAYERS__CREATE_PLAYER } from '../../storex/module/players';
// @ts-ignore: disable-next-line
import html from './navComponent.html';
import './navComponent.scss';

export class NavComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = html;

    /** ================= Controller =================
     * Подписка на события и управление
     */
    this.addEventListener('click', onActon);

    async function onActon(event: any) {
      event.preventDefault();
      const target: Element = event.target;
      const action =
        target.getAttribute('data-action') ||
        target.parentElement?.getAttribute('data-action');
      if (!action) return;

      switch (action) {
        case 'ACTION__PLAYERS__CREATE_PLAYER':
          if (confirm(`Создать нового игрока?`)) {
            const createdPlayer: any = await ACTION__PLAYERS__CREATE_PLAYER();
            location.href = `/#player-edit/${createdPlayer.id}`;
          }
          return;

        default:
          return;
      }
    }
  }
}
