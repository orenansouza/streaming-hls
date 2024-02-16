const express = require('express');
require('dotenv').config()

const routes = require('./src/routes');

const app = express();
app.use('/api', routes)

app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env.API_PORT}`);
});
