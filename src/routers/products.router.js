const productsRouter = require('express').Router()

const productsController = require('../controller/products.controller')

productsRouter.get('/', productsController.getAll)
productsRouter.get('/:id', productsController.detail)
productsRouter.post('/', productsController.create)
productsRouter.patch('/:id', productsController.update)
productsRouter.delete('/:id', productsController.delete)

module.exports = productsRouter