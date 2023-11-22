const adminRouter = require('express').Router()

adminRouter.use('/users', require('./users.router'))
adminRouter.use('/categories', require('./categories.router'))
adminRouter.use('/message', require('./message.router'))
adminRouter.use('/orderDetails', require('./orderDetails.router'))
adminRouter.use('/orders', require('./orders.router'))
adminRouter.use('/productCategories', require('./productCategories.router'))
adminRouter.use('/products', require('./products.router'))
adminRouter.use('/productSize', require('./productSize.router'))
adminRouter.use('/productTags', require('./productTags.router'))
adminRouter.use('/productVariant', require('./productVariant.router'))
adminRouter.use('/promo', require('./promo.router'))

// mengexport userRouter agar dapat digunakan pada file yang membutuhkan
module.exports = adminRouter