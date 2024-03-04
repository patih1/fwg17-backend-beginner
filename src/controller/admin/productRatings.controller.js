const productRatingsModel = require('../../models/productRatings.model')

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
    const productRatings = await productRatingsModel.findAll(search, sortBy, order, page)
    if(productRatings.length < 1){
      throw new Error('no data')
    }
    
    const count = await productRatingsModel.countAll(search)
    const totalPage = Math.ceil(count / 10)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    return res.json({
      success: true,
      message: 'List All productRatings',
      pageInfo: {
        currentPage: Number(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage < 1 ? null : prevPage,
        totalData: Number(count)
      },
      results: productRatings
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
  const productRatings = await productRatingsModel.findOne(id)

  if(!productRatings){
    return res.status(404).json({
      success: false,
      message: `productRatings not found`,
    })
  }

  return res.json({
    success: true,
    message: `Detail productRatings`,
    results: productRatings
  })
}

exports.create = async (req,res) => {
  try {
    const productRatings = await productRatingsModel.insert(req.body)
    return res.json({
      success: true,
      message: 'Create productRatings successfully',
      results: productRatings
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
    const productRatings = await productRatingsModel.update(id, req.body)
    if(productRatings){
      return res.json({
        success: true,
        message: 'Update productRatings successfully',
        results: productRatings
      })
    }else{
      return res.status(404).json({
        success: false,
        message: 'productRatings not found'
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
  const productRatings = await productRatingsModel.delete(id)
  try {
    if(productRatings){
      return res.json({
        success: true,
        message: `successfully delete productRatings`,
        results: productRatings
      })
    }else{
      return res.status(404).json({
        success: false,
        message: `productRatings not found`
      })
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    })
  }
}