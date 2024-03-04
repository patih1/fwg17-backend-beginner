const argon = require('argon2')
const userModel = require('../../models/users.model')

const uploadMiddleware = require('../../middleware/cloudinary.middleware')
const upload = uploadMiddleware('users').single('picture')
const cloudinary = require('../../utils/cloudinary')
const rm = cloudinary.uploader

exports.getAllUsers = async (req, res) => {
  const {
    search,
    sortBy,
    order
  } = req.query

  let {page} = req.query

  if(!page || page < 1){
    page = 1
  }

  try {
    const count = await userModel.countAll(search)
    const user = await userModel.findAll(search, sortBy, order, page)
    
    const totalPage = Math.ceil(count / 10)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    if(user.length < 1){
      throw new Error('no data')
    }

    return res.json({
      success: true,
      message: 'List all users',
      pageInfo: {
        currentPage: Number(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage < 1 ? null : prevPage,
        totalData: Number(count)
      },
      results: user
    })
  }catch(err){
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

exports.detailUser = async (req, res) => {
  const id = Number(req.params.id)
  const user = await userModel.findOne(id)
  if(!user){
    return res.status(404).json({
      success: false,
      message: `User not found`
    })
  }

  return res.json({
    success: true,
    message: `Detail user`,
    results: user
  })
}

exports.createUsers = async (req, res) => {
  return upload(req, res, async (err) => {
    try {
      if(req.body.error == 'default error'){
        throw new Error(req.body.error)
      }
  
      if(err){
        throw err
      }
      if(req.file){
        req.body.picture = req.file.path
      }
      
      if(req.body.password){
        req.body.password = await argon.hash(req.body.password)
      }
  
      const user = await userModel.insert(req.body)
      return res.json({
        success: true,
        message: 'Create user successfully',
        results: user
      })
    }catch(err){
      if(err.code == 23505){
        return res.status(411).json({
          success: false,
          message: 'Email already used'
        })
      }else if (err.code == 23502){
        return res.status(411).json({
          success: false,
          message: 'fullName, password, email cannot be empty'
        })
      }else{
        return res.status(500).json({
          success: false,
          message: err.message
        })
      }
    }
  })
}

exports.updateUser = async (req,res) => {
  return upload(req, res, async (err) => {
    const {id} = req.params
  try {
    if(req.body.error == 'default error'){
      throw new Error(req.body.error)
    }

    if(err){
      throw err
    }

    if(req.body.password){
      req.body.password = await argon.hash(req.body.password)
    }
    
    const data = await userModel.findOne(id)
    
    if(req.file){
      if(data.picture){
        rm
          .destroy(data.picture.split('/').slice(-1).toString().split('.').slice(0, 1) ,{invalidate: true})
          .then(result => console.log(result))
      }
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
    if(err.code == 23505){
      return res.status(411).json({
        success: false,
        message: 'Email already used'
      })
    }else{
      return res.status(500).json({
        success: false,
        message: err.message
      })
    }
  }
  })
}

exports.deleteUser = async(req,res) => {
  const id = Number(req.params.id)
  const user = await userModel.delete(id)
  try {
    if(req.body.error == 'default error'){
      throw new Error(req.body.error)
    }

    if(user){
      
      if(user.picture){
        rm
          .destroy(data.picture.split('/').slice(-1).toString().split('.').slice(0, 1) ,{invalidate: true})
          .then(result => console.log(result))
      }

      return res.json({
        success: true,
        message: `successfully delete user`,
        results: user
      })
    }else{
      throw new Error('user not found')
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}