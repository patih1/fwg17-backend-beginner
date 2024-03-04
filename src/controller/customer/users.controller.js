const argon = require('argon2')
const userModel = require('../../models/users.model')
const uploadMiddleware = require('../../middleware/cloudinary.middleware')
const upload = uploadMiddleware('users').single('picture')

exports.detailUser = async (req, res) => {
  const {id} = req.user
  const user = await userModel.findOne(id)
  if(!user){
    return res.status(404).json({
      success: false,
      message: `User not found`
    })
  }

  if(user.password){
    delete user.password
  }

  return res.json({
    success: true,
    message: `Detail user`,
    results: user
  })
}


exports.updateUser = async (req,res) => {
  return upload(req, res, async (err) => {
    const {id} = req.user
  try {
    if(err){
      throw err
    }

    if(req.body.password){
      req.body.password = await argon.hash(req.body.password)
    }

    if(req.file){
      req.body.picture = req.file.path
    }

    //  const data = await userModel.findOne(id)

  if(req.file){
    req.body.picture = req.file.path
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
    // console.log(err)
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
  })
}