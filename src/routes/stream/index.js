const express = require('express');
const { StreamController } = require('../../controllers');

const router = express.Router();

module.exports = () => {
  const streamController = new StreamController();

  router.get('/', async (req, res) => {
    try {
      console.log('aqui')
      const x = streamController.getStreaming(req, res)
      return x
    } catch (error) {
      console.error('Error in stream route', error)
      res.status(500).send('Internal server error')
    }
  });

  return router;
};