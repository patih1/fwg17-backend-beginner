const ordersModel = require('../../models/orders.model')
const orderDetailsModel = require('../../models/orderDetails.model')
const db = require('../../lib/db.lib')

exports.create = async (req,res) => {
  try {
    const {id} = req.user
    await db.query('BEGIN')
    if(req.body.error == 'default error'){
      throw new Error('default error')
    }
    const detail = req.body.detail

    const orderData = {
      userId : id,
      orderNumber : '#' + Date.now(),
      total : 0,
      fullName : req.body.fullName,
      email : req.body.email,
    }

    const orders = await ordersModel.insert(orderData)

    for(let i = 0; i < detail.length; i++){
        const orderDetailsData = {
          productId : String(detail[i].productId),
          productSizeId : String(detail[i].sizeId),
          productVariantId : String(detail[i].variantId),
          quantity : String(detail[i].quantity),
          orderId : String(orders.id)
        }
        await orderDetailsModel.insert(orderDetailsData)
    }

    const data = {
      total: 'true'
    }

    const finalData = await ordersModel.update(String(orders.id), data)

    await db.query('COMMIT')

    return res.json({
      success: true,
      message: 'Create orders successfully',
      results: finalData
    })
  }catch(err){
    await db.query('ROLLBACK')
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

exports.getAllCs = async (req, res) => {
  const {
    sortBy,
    order,
    filter
  } = req.query

  let {page} = req.query

  if(!page || page < 1){
    page = 1
  }

  const {id} = req.user

  try {
    const orders = await ordersModel.findAllCs(Number(id), sortBy, order, page, filter)
    if(orders.length < 1){
      throw new Error('no data')
    }
    
    const count = await ordersModel.countAll('', filter)
    const totalPage = Math.ceil(count / 10)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1
    return res.json({
      success: true,
      message: 'List All Orders',
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