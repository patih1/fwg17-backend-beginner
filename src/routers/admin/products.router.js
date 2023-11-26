const productsRouter = require('express').Router()
const productsController = require('../../controller/admin/products.controller')
const uploadMiddleware = require('../../middleware/upload.middleware')

productsRouter.get('/', productsController.getAll)
productsRouter.get('/', productsController.searchByPrice)
productsRouter.get('/', productsController.searchByName)
productsRouter.get('/', productsController.searchByCategories)
productsRouter.get('/:id', productsController.detail)
productsRouter.post('/', productsController.create)
productsRouter.patch('/:id', uploadMiddleware('products').single('image'), productsController.update)
productsRouter.delete('/:id', productsController.delete)

module.exports = productsRouter