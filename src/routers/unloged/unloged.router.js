const unlogedRouter = require('express').Router()
const unlogedController = require('../../controller/unloged/unloged.controller')

unlogedRouter.get('/', unlogedController.getAll)
unlogedRouter.get('/:id', unlogedController.detail)

module.exports = unlogedRouter