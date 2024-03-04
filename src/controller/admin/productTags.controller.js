const productTagsModel = require('../../models/productTags.model')

exports.getAll = async (req, res) => {
  const {
    sortBy,
    order
  } = req.query

  let {page} = req.query

  if(!page || page < 1){
    page = 1
  }

  try {
    const productTags = await productTagsModel.findAll(sortBy, order, page)
    if(productTags.length < 1){
      throw new Error('no data')
    }
    
    const count = await productTagsModel.countAll()
    const totalPage = Math.ceil(count / 10)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    return res.json({
      success: true,
      message: 'List All productTags',
      pageInfo: {
        currentPage: Number(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage < 1 ? null : prevPage,
        totalData: Number(count)
      },
      results: productTags
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
  const productTags = await productTagsModel.findOne(id)

  if(!productTags){
    return res.status(404).json({
      success: false,
      message: `productTags not found`,
    })
  }

  return res.json({
    success: true,
    message: `Detail productTags`,
    results: productTags
  })
}

exports.create = async (req,res) => {
  try {
    const productTags = await productTagsModel.insert(req.body)
    return res.json({
      success: true,
      message: 'Create productTags successfully',
      results: productTags
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
        message: err.message
      })
    }
  }
}


exports.update = async (req,res) => {
  const {id} = req.params
  try {
    const productTags = await productTagsModel.update(id, req.body)
    if(productTags){
      return res.json({
        success: true,
        message: 'Update productTags successfully',
        results: productTags
      })
    }else{
      return res.status(404).json({
        success: false,
        message: 'productTags not found'
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
  const productTags = await productTagsModel.delete(id)
  try {
    if(productTags){
      return res.json({
        success: true,
        message: `successfully delete productTags`,
        results: productTags
      })
    }else{
      return res.status(404).json({
        success: false,
        message: `productTags not found`
      })
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    })
  }
}