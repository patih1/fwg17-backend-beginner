const messageModel = require('../../models/message.model')

exports.getAll = async (req, res) => {
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
    const message = await messageModel.findAll(search, sortBy, order, page)
    if(message.length < 1){
      throw new Error('no data')
    }
    
    const count = await messageModel.countAll(search)
    const totalPage = Math.ceil(count / 10)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    return res.json({
      success: true,
      message: 'List All message',
      pageInfo: {
        currentPage: Number(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage < 1 ? null : prevPage,
        totalData: Number(count)
      },
      results: message
    })
  }catch(err){
    return res.status(500).json({
      success: false,
      message: err.message
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
    if(req.body.error == 'default error'){
      throw new Error(req.body.error)
    }
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
        message: 'user id cannot be null'
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


exports.update = async (req,res) => {
  const {id} = req.params
  try {
    if(req.body.error == 'default error'){
      throw new Error(req.body.error)
    }
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
        message: err.message
      })
    }
  }
}

exports.delete = async(req,res) => {
  const id = Number(req.params.id)
  const message = await messageModel.delete(id)
  try {
    if(req.body.error == 'default error'){
      throw new Error(req.body.error)
    }
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
      message: err.message
    })
  }
}