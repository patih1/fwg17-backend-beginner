const ordersRouter = require('express').Router()

const ordersController = require('../../controller/admin/orders.controller')

ordersRouter.get('/', ordersController.getAll)
ordersRouter.get('/:id', ordersController.detail)
ordersRouter.post('/', ordersController.create)
ordersRouter.patch('/:id', ordersController.update)
ordersRouter.delete('/:id', ordersController.delete)

module.exports = ordersRouter