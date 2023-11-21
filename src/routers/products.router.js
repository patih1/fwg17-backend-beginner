const productsRouter = require('express').Router()

const productsController = require('../controller/products.controller')

productsRouter.get('/', productsController.getAll)
productsRouter.get('/b', productsController.searchByPrice)
productsRouter.get('/a', productsController.searchByName)
productsRouter.get('/c', productsController.searchByCategories)
productsRouter.get('/:id', productsController.detail)
productsRouter.post('/', productsController.create)
productsRouter.patch('/:id', productsController.update)
productsRouter.delete('/:id', productsController.delete)

module.exports = productsRouter