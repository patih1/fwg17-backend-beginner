const unlogedRouter = require('express').Router()

unlogedRouter.use('/products', require('./unloged.router'))
unlogedRouter.use('/productVariant', require('./productVariant.router'))
unlogedRouter.use('/productSize', require('./productSize.router'))

module.exports = unlogedRouter