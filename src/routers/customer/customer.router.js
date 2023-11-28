const customerRouter = require('express').Router()
const customerController = require('../../controller/customer/customer.controller')

customerRouter.get('/', customerController.getAll)

module.exports = customerRouter