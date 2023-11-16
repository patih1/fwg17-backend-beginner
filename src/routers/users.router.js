const userRouter = require('express').Router()

const userController = require('../controller/users.controller')

userRouter.get('/', userController.getAllUsers)
userRouter.get('/:id', userController.getUser)
userRouter.post('/create', userController.createUsers)
userRouter.patch('/update', userController.updateUsers)
userRouter.delete('/delete', userController.deleteUsers)

module.exports = userRouter