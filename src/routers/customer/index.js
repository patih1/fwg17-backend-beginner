const customerRouter = require('express').Router()

customerRouter.use('/products', require('./customer.router'))
customerRouter.use('/users', require('./users.router'))
customerRouter.use('/orders', require('./orders.router'))
customerRouter.use('orderDetails', require('./orderDetails.router'))


module.exports = customerRouter