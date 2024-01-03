const customerRouter = require('express').Router()
const userRouter = require('express').Router()

customerRouter.use('/products', require('./customer.router'))
userRouter.use('/users', require('./users.router'))


module.exports = customerRouter