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
    console.log('controller');
    // const io = require('socket.io-client');
    // const socket = io.connect();
    this.emitTest();
  }

  private emitTest(event?: Event) {
    console.log('emitTest');

    event?.preventDefault();

    // const socket2 = io('http://localhost:3000', {
    //   path: '/',
    // });

    // const socket = io.connect('http://localhost:3000');

    // const socket = io('http://localhost:3000'); // <-- хост:порт
    // socket.on('news', function () {
    //   console.log('data news 123');
    //   // socket.emit('my other event', { my: 'data' });
    // });

    // socket.emit('SEND_MESSAGE', { message: 'message emitTest' });
  }
}
