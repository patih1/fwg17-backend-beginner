const productVariantRouter = require('express').Router()

const productVariantController = require('../controller/productVariant.controller')

productVariantRouter.get('/', productVariantController.getAll)
productVariantRouter.get('/:id', productVariantController.detail)
productVariantRouter.post('/', productVariantController.create)
productVariantRouter.patch('/:id', productVariantController.update)
productVariantRouter.delete('/:id', productVariantController.delete)

module.exports = productVariantRouter