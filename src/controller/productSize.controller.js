const userModel = require('../models/productSize.model')

exports.getAll = async (req, res) => {
  const users = await userModel.findAll()
  return res.json({
    success: true,
    message: 'List All Users',
    result: users
  })
}

exports.detail = async (req, res) => {
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
    result: user
  })
}

exports.create = async (req,res) => {
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
      message: `${console.log(err)}`
    })
  }
}

exports.update = async (req,res) => {
  try {
    await userModel.update(req.params.id, req.body)
    return res.json({
      success: true,
      message: 'Update user successfully'
    })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: `${console.log(err)}`
    })
  }
}

exports.delete = async(req,res) => {
  const id = Number(req.params.id)
  await userModel.delete(id)

  return res.json({
    success: true,
    message: `successfully delete user`
  })
}