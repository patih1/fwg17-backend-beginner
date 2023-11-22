const productCategoriesRouter = require('express').Router()

const productCategoriesController = require('../../controller/admin/productCategories.controller')

productCategoriesRouter.get('/', productCategoriesController.getAll)
productCategoriesRouter.get('/:id', productCategoriesController.detail)
productCategoriesRouter.post('/', productCategoriesController.create)
productCategoriesRouter.patch('/:id', productCategoriesController.update)
productCategoriesRouter.delete('/:id', productCategoriesController.delete)

module.exports = productCategoriesRouter