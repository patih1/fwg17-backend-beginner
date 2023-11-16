// membuat object router baru agar dapat menggunakan middleware atau http method seperti get,post,patch, dll
const userRouter = require('express').Router()

// menjalin hubungan antara file ini dengan file users.controller
const userController = require('../controller/users.controller')

// get digunakan untuk mengambil seluruh data
// get(denganParameter) digunakan untuk mengambil data spesifik sesuai yang di definisikan dalam parameter
// post digunakan untuk membuat atau menginsert data
// patch digunakan untuk mengubah data secara parsial
// delete digunakan untuk menghapus data

// mengambil data menggunakan menggunakan callback function dari controller pada endpoint /
userRouter.get('/', userController.getAllUsers)
// mengambil data menggunakan menggunakan callback function dari controller pada endpoint /:id sebagai parameter data yang ingin diambil
userRouter.get('/:id', userController.detailUser)
// menginsert data menggunakan menggunakan callback function dari controller pada endpoint /
userRouter.post('/', userController.createUsers)
// mengubah data menggunakan menggunakan callback function dari controller pada endpoint /:id sebagai parameter data yang ingin diubah
userRouter.patch('/:id', userController.updateUser)
// menghapus data menggunakan menggunakan callback function dari controller pada endpoint /:id sebagai parameter data yang ingin dihapus
userRouter.delete('/:id', userController.deleteUser)

// mengexport userRouter agar dapat digunakan pada file yang membutuhkan
module.exports = userRouter