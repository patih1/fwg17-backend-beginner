const userModel = require('../models/users.model')

// export function getAllUsers
exports.getAllUsers = async (req, res) => {
  const users = await userModel.findAll()
  return res.json({
    success: true,
    message: 'List All Users',
    result: users
  })
}

// export function detailUser
exports.detailUser = async (req, res) => {
  const id = Number(req.params.id)
  // mendeklarasikan user sebagai penampung data users yang sudah di filter sesuai id nya
  const user = await userModel.findOne(id)
  // guarding apabila data yang kembali itu kosong, maka di berukan error message dengan status 404, User not found
  if(!user){
    return res.status(404).json({
      success: false,
      message: `User not found`
    })
  }

  // memberikan response berupa data dalam bentuk json dengan message 'Detail user' 
  // dan menampilkan data users yang telah di filter dalam varuable user
  return res.json({
    success: true,
    message: `Detail user`,
    result: user
  })
}

// export function createUsers
exports.createUsers = async (req,res) => {
  try {
    const user = await userModel.insert(req.body)
    return res.json({
      success: true,
      message: 'Create user successfully',
      result: user
    })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: 'error'
    })
  }
}

// export function updateUser
exports.updateUser = async (req,res) => {
  const {id} = req.params
  try {
    const user = await userModel.update(id, req.body)
    return res.json({
      success: true,
      message: 'Update product successfully',
      result: user
    })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: `Product not found`
    })
  }
}

// export function updateUser
exports.deleteUser = async(req,res) => {
  const id = Number(req.params.id)
  await userModel.delete(id)

  return res.json({
    success: true,
    message: `successfully delete user`
  })
}