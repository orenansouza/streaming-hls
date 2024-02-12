const http = require('http');
const { StreamService } = require('./src/services');
const setupRoutes = require('./src/routes');

const server = http.createServer();
const streamService = new StreamService(server);

setupRoutes(server, streamService);

server.on('listening', () => {
  console.log('Servidor HLS em execução em http://localhost:8000');
});

server.listen(8000);
streamService.attach(server, '/stream');