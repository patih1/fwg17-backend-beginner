const productsModel = require('../../models/products.model')

exports.getAll = async (req, res) => {
  const {
    search,
    sortBy,
    order,
    recommended,
    filter
  } = req.query

  let {page, itemLimit} = req.query

  if(!itemLimit){
    itemLimit = 6
  }

  if(!page){
    page = 1
  }

  try {
    const count = await productsModel.countAll(search)
    const products = await productsModel.findAll(search, sortBy, order, page, Number(itemLimit), recommended, filter)
    if(products.length < 1){
      throw new Error('no data')
    }

    const totalPage = Math.ceil(count / itemLimit)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1
    return res.json({
      success: true,
      message: 'List All products',
      pageInfo: {
        currentPage: Number(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage < 1 ? null : prevPage,
        totalData: Number(count)
      },
      results: products
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
  const products = await productsModel.findOne(id)

  if(!products){
    return res.status(404).json({
      success: false,
      message: `product not found`,
    })
  }

  return res.json({
    success: true,
    message: `Detail products`,
    results: products
  })
}
