const { StreamService } = require('../../services');

class StreamingController {
  #streamService
  constructor() {
    this.#streamService = new StreamService();
  }

  async getStreaming(req, res) {
    // const { url } = req.query;
    console.log('aqui')
    // try {
    //   const stream = await this.#streamService.getStreaming(url);

    //   res.set({
    //     'Content-Type': 'application/x-mpegURL',
    //     'Transfer-Encoding': 'chunked'
    //   });

    //   stream.pipe(res);
    // } catch (error) {
    //   console.error('Error in streaming controller:', error);
    //   res.status(500).send('Internal Server Error');
    // }
  }
}

module.exports = StreamingController;