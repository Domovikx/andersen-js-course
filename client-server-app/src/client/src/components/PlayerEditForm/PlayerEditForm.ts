// @ts-ignore: disable-next-line
import html from './playerEditForm.html';
import './playerEditForm.scss';

import { PLAYER } from '../../constants/player';
import {
  ACTION__PLAYERS__CREATE_PLAYER,
  ACTION__PLAYERS__DELETE_PLAYER,
  ACTION__PLAYERS__UPDATE_PLAYER,
  GETTER__PLAYERS__GET_PLAYER_BY_ID,
} from '../../storex/module/players';

export class PlayerEditForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.view();
    this.controller();
  }

  //** **************** view **************** */
  private view(): void {
    this.innerHTML = html;
  }

  //** **************** controller **************** */
  private controller(): void {
    const self = this;

    this.addEventListener('click', onActon);

    const key: string = this.getAttribute('data-key') || '';
    if (key) {
      setInitialValues(key);
    }

    function setInitialValues(key: string) {
      const player = GETTER__PLAYERS__GET_PLAYER_BY_ID(key);
      Object.entries(player).forEach(([property, value]) => {
        const element: any = self.querySelector(`form [name="${property}"]`);
        element.value = value;
      });
    }

    async function onActon(event: Event) {
      event.preventDefault();
      const target: any = event.target;
      const action: string | null =
        target?.getAttribute('data-action') ||
        target.parentElement?.getAttribute('data-action');
      if (!action) return;

      switch (action) {
        case 'ACTION__PLAYERS__CREATE_PLAYER':
          if (confirm(`Создать нового игрока?`)) {
            const response: any = await ACTION__PLAYERS__CREATE_PLAYER(
              getFormData(),
            );
            location.href = `/#player-edit/${response.id}`;
          }
          return;

        case 'ACTION__PLAYERS__UPDATE_PLAYER':
          ACTION__PLAYERS__UPDATE_PLAYER(key, getFormData());
          return;

        case 'ACTION__PLAYERS__UPDATE_PLAYER_and_CLOSE':
          await ACTION__PLAYERS__UPDATE_PLAYER(key, getFormData());
          location.href = '/#players-list';
          return;

        case 'ACTION__PLAYERS__DELETE_PLAYER':
          if (confirm(`Удалить игрока?`)) {
            await ACTION__PLAYERS__DELETE_PLAYER(key);
            location.href = '/#players-list';
          }
          return;

        case 'ACTION__DICE__GET_RANDOM':
          const diceElement: any = self.querySelector(`form [name="dice"]`);
          diceElement.value = randomNumber();
          return;

        default:
          return;
      }
    }

    function getFormData() {
      const formData: any = { ...PLAYER };

      Object.keys(formData).forEach((property) => {
        const element: any = self.querySelector(`form [name=${property}]`);
        formData[property] = element.value;
      });

      return formData;
    }

    function randomNumber(min = 1, max = 6) {
      return Math.round(Math.random() * (max - min) + min);
    }
  }
}
