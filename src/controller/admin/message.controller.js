const messageModel = require('../../models/message.model')

exports.getAll = async (req, res) => {
  const {
    search,
    sortBy,
    order,
    page
  } = req.query

  try {
    const message = await messageModel.findAll(search, sortBy, order, page)
    return res.json({
      success: true,
      message: 'List All message',
      results: message
    })
  }catch(err){
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

exports.detail = async (req, res) => {
  const id = Number(req.params.id)
  const message = await messageModel.findOne(id)

  if(!message){
    return res.status(404).json({
      success: false,
      message: `message not found`,
    })
  }

  return res.json({
    success: true,
    message: `Detail message`,
    results: message
  })
}

exports.create = async (req,res) => {
  try {
    const message = await messageModel.insert(req.body)
    return res.json({
      success: true,
      message: 'Create message successfully',
      results: message
    })
  }catch(err){
    switch(err.code){
      case "23505":
      return res.status(411).json({
        success: false,
        message: 'name is unique'
      })
      break;
      case '23502':
      return res.status(411).json({
        success: false,
        message: 'name cannot be null'
      })
      break;
      default: 
      return res.status(500).json({
        success: false,
        message: err
      })
    }
  }
}


exports.update = async (req,res) => {
  const {id} = req.params
  try {
    const message = await messageModel.update(id, req.body)
    if(message){
      return res.json({
        success: true,
        message: 'Update message successfully',
        results: message
      })
    }else{
      return res.status(404).json({
        success: false,
        message: 'message not found'
      })
    }
  }catch(err){
    switch(err.code){
      case "23505":
      return res.status(411).json({
        success: false,
        message: 'name is unique'
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

exports.delete = async(req,res) => {
  const id = Number(req.params.id)
  const message = await messageModel.delete(id)
  try {
    if(message){
      return res.json({
        success: true,
        message: `successfully delete message`,
        results: message
      })
    }else{
      return res.status(404).json({
        success: false,
        message: `message not found`
      })
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    })
  }
}