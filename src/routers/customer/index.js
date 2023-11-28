const customerRouter = require('express').Router()

customerRouter.use('/products', require('./customer.router'))

module.exports = customerRouter