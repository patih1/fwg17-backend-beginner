const productTagsRouter = require('express').Router()

const productTagsController = require('../../controller/admin/productTags.controller')

productTagsRouter.get('/', productTagsController.getAll)
productTagsRouter.get('/:id', productTagsController.detail)
productTagsRouter.post('/', productTagsController.create)
productTagsRouter.patch('/:id', productTagsController.update)
productTagsRouter.delete('/:id', productTagsController.delete)

module.exports = productTagsRouter