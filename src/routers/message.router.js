const messageRouter = require('express').Router()

const messageController = require('../controller/message.controller')

messageRouter.get('/', messageController.getAll)
messageRouter.get('/:id', messageController.detail)
messageRouter.post('/', messageController.create)
messageRouter.patch('/:id', messageController.update)
messageRouter.delete('/:id', messageController.delete)

module.exports = messageRouter