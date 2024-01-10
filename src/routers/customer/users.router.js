// membuat object router baru agar dapat menggunakan middleware atau http method seperti get,post,patch, dll
const userRouter = require('express').Router()
const userController = require('../../controller/customer/users.controller')
const uploadMiddleware = require('../../middleware/upload.middleware')

userRouter.get('/', userController.detailUser)
userRouter.patch('/', uploadMiddleware('users').single('picture'), userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)

// mengexport userRouter agar dapat digunakan pada file yang membutuhkan
module.exports = userRouter