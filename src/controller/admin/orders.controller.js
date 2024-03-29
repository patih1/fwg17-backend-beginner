const ordersModel = require('../../models/orders.model')

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
    const orders = await ordersModel.findAll(search, sortBy, order, page)
    if(orders.length < 1){
      throw new Error('no data')
    }
    
    const count = await ordersModel.countAll(search)
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
      results: orders
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
  const orders = await ordersModel.findOne(id)

  if(!orders){
    return res.status(404).json({
      success: false,
      message: `orders not found`,
    })
  }

  return res.json({
    success: true,
    message: `Detail orders`,
    results: orders
  })
}

exports.create = async (req,res) => {
  try {
    const orders = await ordersModel.insert(req.body)
    return res.json({
      success: true,
      message: 'Create orders successfully',
      results: orders
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
    const orders = await ordersModel.update(id, req.body)
    if(orders){
      return res.json({
        success: true,
        message: 'Update orders successfully',
        results: orders
      })
    }else{
      return res.status(404).json({
        success: false,
        message: 'orders not found'
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
  const orders = await ordersModel.delete(id)
  try {
    if(orders){
      return res.json({
        success: true,
        message: `successfully delete orders`,
        results: orders
      })
    }else{
      return res.status(404).json({
        success: false,
        message: `orders not found`
      })
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    })
  }
}