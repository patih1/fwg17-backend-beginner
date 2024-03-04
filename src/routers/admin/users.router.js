const userRouter = require('express').Router()

const userController = require('../../controller/admin/users.controller')

userRouter.get('/', userController.getAllUsers)
userRouter.get('/:id', userController.detailUser)
userRouter.post('/', userController.createUsers)
userRouter.patch('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)

module.exports = userRouter