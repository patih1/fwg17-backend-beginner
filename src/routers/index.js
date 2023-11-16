// membuat object router baru agar dapat menggunakan middleware atau http method seperti get,post,patch, dll
const router = require('express').Router()

// menghubungkan file dengan file auth router pada folder yang sama sekaligus menambahkan endpoint /auth
router.use('/auth', require('./auth.router'))
// menghubungkan file dengan file users router pada folder yang sama sekaligus menambahkan endpoint /users
router.use('/users', require('./users.router'))

// mengexport userRouter agar dapat digunakan pada file yang membutuhkan
module.exports = router