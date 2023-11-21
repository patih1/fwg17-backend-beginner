const userModel = require('../models/users.model')

// export function getAllUsers
exports.getAllUsers = async (req, res) => {
  const {
    search,
    sortBy,
    order,
    page
  } = req.query

  try {
    const user = await userModel.findAll(search, sortBy, order, page)
    return res.json({
      success: true,
      message: 'List all users',
      results: user
    })
  }catch(err){
    return res.status(500).json({
      success: false,
      message: 'Innternal server Error'
    })
  }
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
      results: user
    })
  }catch(err){
    switch(err.code){
      case "23505":
      return res.status(411).json({
        success: false,
        message: 'email is unique'
      })
      break;
      case '23502':
      return res.status(411).json({
        success: false,
        message: 'fullName, password, email cannot be empty'
      })
      break;
      default: 
      return res.status(500).json({
        success: false,
        message: err.code
      })
    }
  }
}

// export function updateUser
exports.updateUser = async (req,res) => {
  const {id} = req.params
  try {
    const user = await userModel.update(id, req.body)
    if(user){
      return res.json({
        success: true,
        message: 'Update user successfully',
        results: user
      })
    }else{
      return res.status(404).json({
        success: false,
        message: 'user not found'
      })
    }
  }catch(err){
    switch(err.code){
      case "23505":
      return res.status(411).json({
        success: false,
        message: 'email is unique'
      })
      break;
      default: 
      return res.status(500).json({
        success: false,
        message: err.code
      })
    }
  }
}

// export function updateUser
exports.deleteUser = async(req,res) => {
  const id = Number(req.params.id)
  const user = await userModel.delete(id)
  try {
    if(user){
      return res.json({
        success: true,
        message: `successfully delete user`,
        results: user
      })
    }else{
      return res.status(404).json({
        success: false,
        message: `user not found`
      })
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    })
  }
}