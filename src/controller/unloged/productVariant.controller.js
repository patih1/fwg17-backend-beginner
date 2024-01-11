const productVariantModel = require('../../models/productVariant.model')

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

