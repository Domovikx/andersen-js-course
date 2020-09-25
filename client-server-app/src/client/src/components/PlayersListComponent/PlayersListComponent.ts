// @ts-ignore: disable-next-line
import html from './playersListComponent.html';
import './playersListComponent.scss';

import {
  ACTION__PLAYERS__DELETE_PLAYER,
  ACTION__PLAYERS__UPDATE_PLAYER,
  GETTER__PLAYERS__GET_ALL_PLAYERS,
} from '../../storex/module/players';

export class PlayersListComponent extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */

    const renderPlayersListComponent = async () => {
      this.innerHTML = html;

      const players = GETTER__PLAYERS__GET_ALL_PLAYERS();

      const templateCard: any = this.querySelector('.template-card');
      console.log('templateCard', templateCard);

      Object.entries(players).forEach(([key, val]: any) => {
        console.log('val', val);
        const { name, level, power } = val;
        const clone = templateCard.content.cloneNode(true);

        const playerName = clone.querySelector('.player-name');
        playerName.textContent = name || 'anonym';

        const levelText = clone.querySelector('.level-text');
        levelText.textContent = level || 0;

        const powerText = clone.querySelector('.power-text');
        powerText.textContent = power || 0;

        const totalText = clone.querySelector('.total-text');
        totalText.textContent = level + power || 0;

        const dataKeyAll: any = clone.querySelectorAll('[data-key]');
        dataKeyAll.forEach((dataKeyElement: any) => {
          dataKeyElement.setAttribute('data-key', key);
        });

        templateCard.parentNode.appendChild(clone);
      });
    };

    renderPlayersListComponent();

    /** ================= Controller =================
     * Подписка на события и управление
     */
    this.addEventListener('click', onActon, false);
    ('ACTION__PLAYERS__DELETE_PLAYER');
    function onActon(event: any) {
      const target: Element = event.target;
      const key: any = target.getAttribute('data-key');
      const action: any = target.getAttribute('data-action');
      const property: any = target.getAttribute('data-property');

      const players = GETTER__PLAYERS__GET_ALL_PLAYERS();
      const player = players[key];

      switch (action) {
        case 'ACTION__PLAYERS__DELETE_PLAYER':
          if (confirm(`Удалить игрока?`)) {
            (async () => {
              await ACTION__PLAYERS__DELETE_PLAYER(key);
              renderPlayersListComponent();
            })();
          }
          return;

        case 'ACTION__PLAYERS__PROPERTY_INCREASE':
          player[property]++;
          ACTION__PLAYERS__UPDATE_PLAYER(key, player);
          return;

        case 'ACTION__PLAYERS__PROPERTY_DECREASE':
          player[property]--;
          ACTION__PLAYERS__UPDATE_PLAYER(key, player);
          return;

        default:
          return;
      }
    }
  }
}
