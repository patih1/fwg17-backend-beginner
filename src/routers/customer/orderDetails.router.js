const orderDetailsRouter = require('express').Router()

const orderDetailsController = require('../../controller/customer/orderDetails.controller')

orderDetailsRouter.get('/', orderDetailsController.getAll)
orderDetailsRouter.get('/:id', orderDetailsController.detail)
orderDetailsRouter.post('/', orderDetailsController.create)

module.exports = orderDetailsRouter