const ordersRouter = require('express').Router()

const ordersController = require('../../controller/customer/orders.controller')

ordersRouter.get('/', ordersController.getAllCs)
ordersRouter.get('/:id', ordersController.detail)
ordersRouter.post('/', ordersController.create)
// ordersRouter.patch('/:id', ordersController.update)

module.exports = ordersRouter