import colors from 'colors';

import { PORT_SERVER } from './config/config';
import { server } from './server';

const port = process.env.PORT || PORT_SERVER;

server.listen(port, () => {
  console.log(
    colors.bold.yellow(
      `\nhttp://localhost:${port} - Server started - success.\n`,
    ),
  );
});
