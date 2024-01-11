const productSizeRouter = require('express').Router()

const productSizeController = require('../../controller/unloged/productSize.controller')

productSizeRouter.get('/', productSizeController.getAll)
productSizeRouter.get('/:id', productSizeController.detail)

module.exports = productSizeRouter