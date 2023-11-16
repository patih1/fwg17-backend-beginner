// membuat object router baru agar dapat menggunakan middleware atau http method seperti get,post,patch, dll
const authRouter = require('express').Router()

// menjalin hubungan antara file ini dengan file auth.controller
const authController = require('../controller/auth.controller')

// mengirimkan data login menggunakan callback function controller pada endpoint /login
authRouter.post('/login', authController.login)

// mengexport userRouter agar dapat digunakan pada file yang membutuhkan
module.exports = authRouter