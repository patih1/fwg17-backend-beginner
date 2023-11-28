const productsModel = require('../../models/products.model')

exports.getAll = async (req, res) => {
  const {
    search,
    sortBy,
    order,
    page
  } = req.query

  try {
    const products = await productsModel.findAll(search, sortBy, order, page)
    return res.json({
      success: true,
      message: 'List All products',
      results: products
    })
  }catch(err){
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}
