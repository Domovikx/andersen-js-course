import { server } from './server';

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.clear();
  console.info(`http://localhost:${port} - Server`);
  console.info(`http://localhost:8080 - Frontend`);
});
