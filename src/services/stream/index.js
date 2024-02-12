const Hls = require('hls-server');

class StreamService {
  constructor(server) {
    const config = {
      path: './streams',
      dir: 'public/videos'
    }
    this.hls = new Hls(server, config);

    this.clients = 0;
    // TODO change Hls.Events.MEDIA_ATTACHED to media_file
    this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      this.clients++;
      console.log(`Connected client. Total customers: ${this.clients}`);
    });

    this.hls.on(Hls.Events.MEDIA_DETACHED, () => {
      this.clients--;
      console.log(`Client disconnected. Total customers: ${this.clients}`);
    });
  }

  attach(server, path) {
    this.hls.attach(server, path);
  }
}

module.exports = StreamService;