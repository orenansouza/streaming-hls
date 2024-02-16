const express = require('express')

const streamingRoutes = require('./stream')

const routes = express.Router()

routes.use('/streaming', streamingRoutes)

module.exports = routes;