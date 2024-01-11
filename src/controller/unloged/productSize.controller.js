const productSizeModel = require('../../models/productSize.model')

exports.getAll = async (req, res) => {
  const {
    search,
    sortBy,
    order,
    page
  } = req.query

  try {
    const productSize = await productSizeModel.findAll(search, sortBy, order, page)
    return res.json({
      success: true,
      message: 'List All productSize',
      results: productSize
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