

// membuat object router baru agar dapat menggunakan middleware atau http method seperti get,post,patch, dll
const router = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')
const roleCheckMiddleware = require('../middleware/roleCheck.middleware')
// menghubungkan file dengan file auth router pada folder yang sama sekaligus menambahkan endpoint /auth
router.use('/auth', require('./auth.router'))
router.use('/admin', authMiddleware, roleCheckMiddleware('admin'), require('./admin'))
router.use('/customer', authMiddleware, require('./customer'))
router.use('/', require('./unloged'))


module.exports = router

