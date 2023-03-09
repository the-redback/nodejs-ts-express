import {createServer, IncomingMessage, ServerResponse} from 'http';

const server = createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    response.end('Hello world!');
  }
);

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
