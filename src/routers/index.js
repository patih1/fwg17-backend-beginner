// membuat object router baru agar dapat menggunakan middleware atau http method seperti get,post,patch, dll
const router = require('express').Router()

// menghubungkan file dengan file auth router pada folder yang sama sekaligus menambahkan endpoint /auth
router.use('/auth', require('./auth.router'))
// menghubungkan file dengan file users router pada folder yang sama sekaligus menambahkan endpoint /users
router.use('/users', require('./users.router'))
router.use('/categories', require('./categories.router'))
router.use('/message', require('./message.router'))
router.use('/orderDetails', require('./orderDetails.router'))
router.use('/orders', require('./orders.router'))
router.use('/productCategories', require('./productCategories.router'))
router.use('/products', require('./products.router'))
router.use('/productSize', require('./productSize.router'))
router.use('/productTags', require('./productTags.router'))
router.use('/productVariant', require('./productVariant.router'))
router.use('/promo', require('./promo.router'))

// mengexport userRouter agar dapat digunakan pada file yang membutuhkan
module.exports = router