const orderDetailsRouter = require('express').Router()

const orderDetailsController = require('../../controller/admin/orderDetails.controller')

orderDetailsRouter.get('/', orderDetailsController.getAll)
orderDetailsRouter.get('/:id', orderDetailsController.detail)
orderDetailsRouter.post('/', orderDetailsController.create)
orderDetailsRouter.patch('/:id', orderDetailsController.update)
orderDetailsRouter.delete('/:id', orderDetailsController.delete)

module.exports = orderDetailsRouter