const userModel = require('../../models/productVariant.model')

exports.getAll = async (req, res) => {
  const {
    search,
    sortBy,
    order,
    page
  } = req.query

  try {
    const productVariant = await productVariantModel.findAll(search, sortBy, order, page)
    return res.json({
      success: true,
      message: 'List All productVariant',
      results: productVariant
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
  const productVariant = await productVariantModel.findOne(id)

  if(!productVariant){
    return res.status(404).json({
      success: false,
      message: `productVariant not found`,
    })
  }

  return res.json({
    success: true,
    message: `Detail productVariant`,
    results: productVariant
  })
}

exports.create = async (req,res) => {
  try {
    const productVariant = await productVariantModel.insert(req.body)
    return res.json({
      success: true,
      message: 'Create productVariant successfully',
      results: productVariant
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
    const productVariant = await productVariantModel.update(id, req.body)
    if(productVariant){
      return res.json({
        success: true,
        message: 'Update productVariant successfully',
        results: productVariant
      })
    }else{
      return res.status(404).json({
        success: false,
        message: 'productVariant not found'
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
  const productVariant = await productVariantModel.delete(id)
  try {
    if(productVariant){
      return res.json({
        success: true,
        message: `successfully delete productVariant`,
        results: productVariant
      })
    }else{
      return res.status(404).json({
        success: false,
        message: `productVariant not found`
      })
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    })
  }
}