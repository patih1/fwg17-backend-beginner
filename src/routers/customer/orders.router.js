const ordersRouter = require('express').Router()

const ordersController = require('../../controller/customer/orders.controller')

ordersRouter.get('/', ordersController.getAll)
ordersRouter.get('/:id', ordersController.detail)
ordersRouter.post('/', ordersController.create)

module.exports = ordersRouter