// @ts-ignore: disable-next-line
import html from './combatComponent.html';
import './combatComponent.scss';

import io from 'socket.io-client';

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
  }

  //** **************** controller **************** */
  private controller(): void {
    this.socketHandler();
  }

  private socketHandler() {
    const socket = io('http://localhost:3000/api/socket');

    socket.on('news', function (data: any = 'aaaaa') {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  }
}
