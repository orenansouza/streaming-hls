const StreamController = require('../controllers');

function setupRoutes(server, streamService) {
  const streamController = new StreamController(streamService);

  server.on('request', (req, res) => {
    if (req.url === '/') {
      return streamController.index(req, res);
    }

    res.writeHead(404);
    res.end('Not Found');
  });
}

module.exports = setupRoutes;