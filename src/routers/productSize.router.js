const productSizeRouter = require('express').Router()

const productSizeController = require('../controller/productSize.controller')

productSizeRouter.get('/', productSizeController.getAll)
productSizeRouter.get('/:id', productSizeController.detail)
productSizeRouter.post('/', productSizeController.create)
productSizeRouter.patch('/:id', productSizeController.update)
productSizeRouter.delete('/:id', productSizeController.delete)

module.exports = productSizeRouter