const orderDetailsModel = require('../../models/orderDetails.model')

exports.getAll = async (req, res) => {
  const {
    search,
    sortBy,
    order,
    page
  } = req.query

  try {
    const orderDetails = await orderDetailsModel.findAll(search, sortBy, order, page)
    return res.json({
      success: true,
      message: 'List All orderDetails',
      results: orderDetails
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