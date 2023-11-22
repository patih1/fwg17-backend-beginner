const categoriesRouter = require('express').Router()

const categoriesController = require('../../controller/admin/categories.controller')

categoriesRouter.get('/', categoriesController.getAll)
categoriesRouter.get('/:id', categoriesController.detail)
categoriesRouter.post('/', categoriesController.create)
categoriesRouter.patch('/:id', categoriesController.update)
categoriesRouter.delete('/:id', categoriesController.delete)

module.exports = categoriesRouter