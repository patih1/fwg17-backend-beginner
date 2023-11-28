const unlogedRouter = require('express').Router()

unlogedRouter.use('/products', require('./unloged.router'))

module.exports = unlogedRouter