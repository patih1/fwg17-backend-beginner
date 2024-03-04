const productSizeModel = require('../../models/productSize.model')

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
    const productSize = await productSizeModel.findAll( sortBy, order, page)
    if(productSize.length < 1){
      throw new Error('no data')
    }
    
    const count = await productSizeModel.countAll()
    const totalPage = Math.ceil(count / 10)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    return res.json({
      success: true,
      message: 'List All productSize',
      pageInfo: {
        currentPage: Number(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage < 1 ? null : prevPage,
        totalData: Number(count)
      },
      results: productSize
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
  const productSize = await productSizeModel.findOne(id)

  if(!productSize){
    return res.status(404).json({
      success: false,
      message: `productSize not found`,
    })
  }

  return res.json({
    success: true,
    message: `Detail productSize`,
    results: productSize
  })
}

exports.create = async (req,res) => {
  try {
    const productSize = await productSizeModel.insert(req.body)
    return res.json({
      success: true,
      message: 'Create productSize successfully',
      results: productSize
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
    const productSize = await productSizeModel.update(id, req.body)
    if(productSize){
      return res.json({
        success: true,
        message: 'Update productSize successfully',
        results: productSize
      })
    }else{
      return res.status(404).json({
        success: false,
        message: 'productSize not found'
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
  const productSize = await productSizeModel.delete(id)
  try {
    if(productSize){
      return res.json({
        success: true,
        message: `successfully delete productSize`,
        results: productSize
      })
    }else{
      return res.status(404).json({
        success: false,
        message: `productSize not found`
      })
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    })
  }
}