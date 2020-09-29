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
    const self = this;
    /** ================= VIEW =================
     * Получение стейта и его рендеринг
     */
    this.innerHTML = html;

    /** ================= Controller =================
     * Подписка на события и управление
     */
    const key: any = this.getAttribute('data-key');

    function init() {
      if (key) {
        setInitialValues(key);
      }
      self.addEventListener('click', onActon);
    }
    init();

    function setInitialValues(key: any) {
      const player = GETTER__PLAYERS__GET_PLAYER_BY_ID(key);
      Object.entries(player).forEach(([property, value]) => {
        const element: any = self.querySelector(`form [name="${property}"]`);
        element.value = value;
      });
    }

    async function onActon(event: Event) {
      event.preventDefault();
      const target: any = event.target;
      const action: String | null =
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
