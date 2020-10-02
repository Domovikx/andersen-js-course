// @ts-ignore: disable-next-line
import html from './combatComponent.html';
import './combatComponent.scss';

import io from 'socket.io-client';
import { GETTER__PLAYERS__GET_ALL_PLAYERS } from '../../storex/module/players';

export class CombatComponent extends HTMLElement {
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

    const players = GETTER__PLAYERS__GET_ALL_PLAYERS();

    const optionsFragment: DocumentFragment = getOptionsFragment(players);

    const generalPlayer = this.querySelector(`[name="generalPlayer"]`);
    generalPlayer?.append(optionsFragment.cloneNode(true));

    const support_player = this.querySelector(`[name="supportPlayer"]`);
    support_player?.append(optionsFragment.cloneNode(true));

    function getOptionsFragment(players: any): DocumentFragment {
      const fragment = new DocumentFragment();
      Object.entries(players).forEach(([id, { name, level, power }]: any) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = `${name} | ${level + power}=${level | 0}+${
          power | 0
        }`;
        fragment.append(option);
      });
      return fragment;
    }
  }

  //** **************** controller **************** */
  private controller(): void {
    const self = this;

    // socket
    const socket = io('http://localhost:3000/api/socket');
    socket.emit('CONNECT_NEW_CLIENT');
    socket.on('SERVER_RESPONSE', (responseFormData: any) => {
      updateFormData(responseFormData);
    });

    const form: HTMLFormElement | null = this.querySelector('form');
    form?.addEventListener('change', onChange);

    function onChange(event: Event) {
      const formData = getFormData();
      socket.emit('REQUEST_SERVER', formData);
    }

    function updateFormData(formData: any) {
      const {
        generalPlayerID,
        generalPlayerBuffs,
        supportPlayerID,
        supportPlayerBuffs,
        monstersAndBuffs,
      } = formData;

      const form: HTMLFormElement | null = self.querySelector('form');

      const generalPlayerElement: any = form?.querySelector(
        '[name="generalPlayer"]',
      );
      generalPlayerElement.value = generalPlayerID;

      const generalPlayerBuffsElement: any = form?.querySelector(
        '[name="generalPlayerBuffs"]',
      );
      generalPlayerBuffsElement.value = generalPlayerBuffs;

      const supportPlayerElement: any = form?.querySelector(
        '[name="supportPlayer"]',
      );
      supportPlayerElement.value = supportPlayerID;

      const supportPlayerBuffsElement: any = form?.querySelector(
        '[name="supportPlayerBuffs"]',
      );
      supportPlayerBuffsElement.value = supportPlayerBuffs;

      const monstersAndBuffsElement: any = form?.querySelector(
        '[name="monstersAndBuffs"]',
      );
      monstersAndBuffsElement.value = monstersAndBuffs;
    }

    function getFormData(): {} {
      const form: HTMLFormElement | null = self.querySelector('form');

      const generalPlayerElement:
        | HTMLSelectElement
        | null
        | undefined = form?.querySelector('[name="generalPlayer"]');
      const generalPlayerID: string | null =
        generalPlayerElement?.value || null;

      const supportPlayerElement:
        | HTMLSelectElement
        | null
        | undefined = form?.querySelector('[name="supportPlayer"]');
      const supportPlayerID: string | null =
        supportPlayerElement?.value || null;

      const generalPlayerBuffsElement:
        | HTMLInputElement
        | null
        | undefined = form?.querySelector('[name="generalPlayerBuffs"]');
      const generalPlayerBuffs: string | null =
        generalPlayerBuffsElement?.value || null;

      const supportPlayerBuffsElement:
        | HTMLInputElement
        | null
        | undefined = form?.querySelector('[name="supportPlayerBuffs"]');
      const supportPlayerBuffs: string | null =
        supportPlayerBuffsElement?.value || null;

      const monstersAndBuffsElement:
        | HTMLInputElement
        | null
        | undefined = form?.querySelector('[name="monstersAndBuffs"]');
      const monstersAndBuffs: string | null =
        monstersAndBuffsElement?.value || null;

      return {
        generalPlayerID,
        generalPlayerBuffs,
        supportPlayerID,
        supportPlayerBuffs,
        monstersAndBuffs,
      };
    }
  }
}
