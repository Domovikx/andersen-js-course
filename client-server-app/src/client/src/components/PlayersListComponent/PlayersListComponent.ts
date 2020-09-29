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
    const self = this;
    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */

    const renderPlayersListComponent = async () => {
      this.innerHTML = html;

      const players = GETTER__PLAYERS__GET_ALL_PLAYERS();

      const templateCard: any = this.querySelector('.template-card');

      Object.entries(players).forEach(([key, val]: any) => {
        const {
          name,
          level,
          power,
          color,
          number,
          sex,
          class: plClass,
          race,
          dice,
        } = val;

        const clone = templateCard.content.cloneNode(true);

        const playerName = clone.querySelector('.player-name');
        playerName.textContent = name ? `${number || ''} ${name}` : 'anonym';

        const playerColor = clone.querySelector('.player-color');
        playerColor.setAttribute('style', `border-color:${color}`);

        const levelText = clone.querySelector('.level-text');
        levelText.textContent = level || 0;

        const powerText = clone.querySelector('.power-text');
        powerText.textContent = power || 0;

        const totalText = clone.querySelector('.total-text');
        totalText.textContent = level + power || 0;

        const sexText = clone.querySelector('.sex-text');
        sexText.textContent = sex || '';

        const classText = clone.querySelector('.class-text');
        classText.textContent = plClass || '';

        const raceText = clone.querySelector('.race-text');
        raceText.textContent = race || '';

        const diceText = clone.querySelector('.dice-text');
        diceText.textContent = `dice: ${dice}` || 1;

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

    async function onActon(event: any) {
      const target: Element = event.target;
      const action: any = target.getAttribute('data-action');
      if (!action) return;
      const key: any = target.getAttribute('data-key');
      const property: any = target.getAttribute('data-property');

      const players = GETTER__PLAYERS__GET_ALL_PLAYERS();
      const player = players[key];

      const propertyText: any = self.querySelector(
        `.${property}-text[data-key='${key}']`,
      );
      const totalText: any = self.querySelector(
        `.total-text[data-key='${key}']`,
      );

      switch (action) {
        case 'ACTION__PLAYERS__DELETE_PLAYER':
          if (confirm(`Удалить игрока?`)) {
            await ACTION__PLAYERS__DELETE_PLAYER(key);
            renderPlayersListComponent();
          }
          return;

        case 'ACTION__PLAYERS__PROPERTY_INCREASE':
          player[property]++;
          propertyText.textContent++;
          totalText.textContent++;
          ACTION__PLAYERS__UPDATE_PLAYER(key, player);
          return;

        case 'ACTION__PLAYERS__PROPERTY_DECREASE':
          player[property]--;
          propertyText.textContent--;
          totalText.textContent--;
          ACTION__PLAYERS__UPDATE_PLAYER(key, player);
          return;

        case 'ACTION__GOTO_PLAYER_EDIT_FORM':
          location.href = `/#player-edit/${key}`;
          return;

        default:
          return;
      }
    }
  }
}
