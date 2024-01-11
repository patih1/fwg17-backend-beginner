const productVariantRouter = require('express').Router()

const productVariantController = require('../../controller/unloged/productVariant.controller')

productVariantRouter.get('/', productVariantController.getAll)
productVariantRouter.get('/:id', productVariantController.detail)

module.exports = productVariantRouter