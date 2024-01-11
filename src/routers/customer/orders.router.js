const ordersRouter = require('express').Router()

const ordersController = require('../../controller/customer/orders.controller')

ordersRouter.get('/:id', ordersController.getAllCs)
ordersRouter.post('/', ordersController.create)
ordersRouter.patch('/:id', ordersController.update)

module.exports = ordersRouter