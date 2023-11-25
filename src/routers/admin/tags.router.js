const tagsRouter = require('express').Router()

const tagsController = require('../../controller/admin/tags.controller')

tagsRouter.get('/', tagsController.getAll)
tagsRouter.get('/:id', tagsController.detail)
tagsRouter.post('/', tagsController.create)
tagsRouter.patch('/:id', tagsController.update)
tagsRouter.delete('/:id', tagsController.delete)

module.exports = tagsRouter