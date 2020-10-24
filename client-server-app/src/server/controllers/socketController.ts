import { Socket } from 'socket.io';

const connections: any[] = [];
let tempStore = {};

function socketController(socket: Socket) {
  connections.push(socket);
  console.log('socket.io - connect');

  socket.on('CONNECT_NEW_CLIENT', () => {
    const keys = Object.keys(tempStore).length;
    if (keys) {
      socket.emit('SERVER_RESPONSE', tempStore);
    }
  });

  socket.on('REQUEST_SERVER', (date: any) => {
    tempStore = { ...date };
    socket.broadcast.emit('SERVER_RESPONSE', date);
  });

  socket.on('disconnect', () => {
    console.log('socket.io - disconnect');
    connections.splice(connections.indexOf(socket), 1);
  });
}

export { socketController };
