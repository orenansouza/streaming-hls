const http = require('http');
require('dotenv').config()

const { StreamService, MinioService } = require('./src/services');
const setupRoutes = require('./src/routes');

const server = http.createServer();
// const streamService = new StreamService(server);

// setupRoutes(server, streamService);

server.on('listening', async () => {

  const endpoint = process.env.MINIO_ENDPOINT;
  const accessKey = process.env.MINIO_ACCESS_KEY;
  const secretKey = process.env.MINIO_SECRET_KEY;
  const port = Number(process.env.MINIO_PORT);
  new MinioService(endpoint, accessKey, secretKey, port, false);

  console.log(`Servidor HLS em execução em http://localhost:${process.env.API_PORT}`);
});

server.listen(process.env.API_PORT);
// streamService.attach(server, '/stream');