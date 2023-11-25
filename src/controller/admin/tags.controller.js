const userModel = require('../../models/tags.model')

exports.getAll = async (req, res) => {
  const {
    search,
    sortBy,
    order,
    page
  } = req.query

  try {
    const tags = await tagsModel.findAll(search, sortBy, order, page)
    return res.json({
      success: true,
      message: 'List All tags',
      results: tags
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
  const tags = await tagsModel.findOne(id)

  if(!tags){
    return res.status(404).json({
      success: false,
      message: `tags not found`,
    })
  }

  return res.json({
    success: true,
    message: `Detail tags`,
    results: tags
  })
}

exports.create = async (req,res) => {
  try {
    const tags = await tagsModel.insert(req.body)
    return res.json({
      success: true,
      message: 'Create tags successfully',
      results: tags
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
    const tags = await tagsModel.update(id, req.body)
    if(tags){
      return res.json({
        success: true,
        message: 'Update tags successfully',
        results: tags
      })
    }else{
      return res.status(404).json({
        success: false,
        message: 'tags not found'
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
  const tags = await tagsModel.delete(id)
  try {
    if(tags){
      return res.json({
        success: true,
        message: `successfully delete tags`,
        results: tags
      })
    }else{
      return res.status(404).json({
        success: false,
        message: `tags not found`
      })
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    })
  }
}