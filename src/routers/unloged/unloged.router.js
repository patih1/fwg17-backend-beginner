const unlogedRouter = require('express').Router()
const unlogedController = require('../../controller/unloged/unloged.controller')

unlogedRouter.get('/', unlogedController.getAll)

module.exports = unlogedRouter