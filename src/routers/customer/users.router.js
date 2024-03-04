// membuat object router baru agar dapat menggunakan middleware atau http method seperti get,post,patch, dll
const userRouter = require('express').Router()
const userController = require('../../controller/customer/users.controller')

userRouter.get('/', userController.detailUser)
userRouter.patch('/', userController.updateUser)

// mengexport userRouter agar dapat digunakan pada file yang membutuhkan
module.exports = userRouter