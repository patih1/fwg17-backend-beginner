const productCategoryModel = require('../../models/productCategories.model')

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
    const productCategories = await productCategoryModel.findAll(search, sortBy, order, page)
    if(productCategories.length < 1){
      throw new Error('no data')
    }
    
    const count = await productCategoryModel.countAll(search)
    const totalPage = Math.ceil(count / 10)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    return res.json({
      success: true,
      message: 'List All productCategories',
      pageInfo: {
        currentPage: Number(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage < 1 ? null : prevPage,
        totalData: Number(count)
      },
      results: productCategories
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
  const productCategory = await productCategoryModel.findOne(id)

  if(!productCategory){
    return res.status(404).json({
      success: false,
      message: `productCategory not found`,
    })
  }

  return res.json({
    success: true,
    message: `Detail productCategory`,
    results: productCategory
  })
}

exports.create = async (req,res) => {
  try {
    const productCategory = await productCategoryModel.insert(req.body)
    return res.json({
      success: true,
      message: 'Create productCategory successfully',
      results: productCategory
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
    const productCategory = await productCategoryModel.update(id, req.body)
    if(productCategory){
      return res.json({
        success: true,
        message: 'Update productCategory successfully',
        results: productCategory
      })
    }else{
      return res.status(404).json({
        success: false,
        message: 'productCategory not found'
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
  const productCategory = await productCategoryModel.delete(id)
  try {
    if(productCategory){
      return res.json({
        success: true,
        message: `successfully delete productCategory`,
        results: productCategory
      })
    }else{
      return res.status(404).json({
        success: false,
        message: `productCategory not found`
      })
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    })
  }
}