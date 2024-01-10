const argon = require('argon2')
const userModel = require('../../models/users.model')
const path = require('path')
const fs = require('fs/promises')

// export function detailUser
exports.detailUser = async (req, res) => {
  const {id} = req.user
  // mendeklarasikan user sebagai penampung data users yang sudah di filter sesuai id nya
  const user = await userModel.findOne(id)
  // guarding apabila data yang kembali itu kosong, maka di berukan error message dengan status 404, User not found
  if(!user){
    return res.status(404).json({
      success: false,
      message: `User not found`
    })
  }

  if(user.password){
    delete user.password
  }

  // memberikan response berupa data dalam bentuk json dengan message 'Detail user' 
  // dan menampilkan data users yang telah di filter dalam varuable user
  return res.json({
    success: true,
    message: `Detail user`,
    result: user
  })
}


exports.updateUser = async (req,res) => {
  const {id} = req.user
  try {
    if(req.body.password){
      req.body.password = await argon.hash(req.body.password)
    }

    if(req.file){
      req.body.picture = req.file.filename
    }

     const data = await userModel.findOne(id)

  // console.log(data)

  if(req.file){
    if(data.picture){
      const uploadLocation = path.join(global.path, 'upload', 'users', data.picture)
      await fs.rm(uploadLocation)
    }
    req.body.picture = req.file.filename
  }

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
        message: err.message
      })
    }
  }
}

// export function updateUser
exports.deleteUser = async(req,res) => {
  const {id} = req.user
  const user = await userModel.delete(id)
  if(user.picture){
    const uploadLocation = path.join(global.path, 'upload', 'users', user.picture)
      fs.rm(uploadLocation)
  }
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