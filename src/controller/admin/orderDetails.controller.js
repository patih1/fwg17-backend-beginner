const orderDetailsModel = require('../../models/orderDetails.model')

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
    const orderDetails = await orderDetailsModel.findAll(search, sortBy, order, page)
    if(orderDetails.length < 1){
      throw new Error('no data')
    }
    
    const count = await orderDetailsModel.countAll(search)
    const totalPage = Math.ceil(count / 10)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    return res.json({
      success: true,
      message: 'List All orderDetails',
      pageInfo: {
        currentPage: Number(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage < 1 ? null : prevPage,
        totalData: Number(count)
      },
      results: orderDetails
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
  const orderDetails = await orderDetailsModel.findOne(id)

  if(!orderDetails){
    return res.status(404).json({
      success: false,
      message: `orderDetails not found`,
    })
  }

  return res.json({
    success: true,
    message: `Detail orderDetails`,
    results: orderDetails
  })
}

exports.create = async (req,res) => {
  try {
    const orderDetails = await orderDetailsModel.insert(req.body)
    return res.json({
      success: true,
      message: 'Create orderDetails successfully',
      results: orderDetails
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
        message: err
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
    const orderDetails = await orderDetailsModel.update(id, req.body)
    if(orderDetails){
      return res.json({
        success: true,
        message: 'Update orderDetails successfully',
        results: orderDetails
      })
    }else{
      return res.status(404).json({
        success: false,
        message: 'orderDetails not found'
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
  const orderDetails = await orderDetailsModel.delete(id)
  try {
    if(orderDetails){
      return res.json({
        success: true,
        message: `successfully delete orderDetails`,
        results: orderDetails
      })
    }else{
      return res.status(404).json({
        success: false,
        message: `orderDetails not found`
      })
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    })
  }
}