import { PORT_SERVER } from './config/config';
import { server } from './server';

const port = process.env.PORT || PORT_SERVER;

server.listen(port, () => {
  console.info(`\nhttp://localhost:${port} - Server started - success.\n`);
});
