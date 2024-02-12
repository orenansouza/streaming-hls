class StreamController {
  constructor(streamService) {
    this.streamService = streamService;
  }

  index(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('HLS streaming server running');
  }
}

module.exports = StreamController;