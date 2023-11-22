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

exports.create = async (req,res) => {
  try {
    const products = await productsModel.insert(req.body)
    return res.json({
      success: true,
      message: 'Create product successfully',
      results: products
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
        message: 'name, description, basePrice cannot be null'
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


exports.update = async (req,res) => {
  const {id} = req.params
  console.log(req.body)
  try {
    const products = await productsModel.update(id, req.body)
    if(products){
      return res.json({
        success: true,
        message: 'Update product successfully',
        results: products
      })
    }else{
      return res.status(404).json({
        success: false,
        message: typeof products
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
  const products = await productsModel.delete(id)
  try {
    if(products){
      return res.json({
        success: true,
        message: `successfully delete product`,
        results: products
      })
    }else{
      return res.status(404).json({
        success: false,
        message: `Product not found`
      })
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    })
  }
}

exports.searchByName = async(req,res) => {
  const {search} = req.query
  const products = await productsModel.searchByName(search)
  try{
    return res.json({
      success: true,
      message: 'Products sorted by name',
      results: products
    })
  }catch(err){
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}



exports.searchByPrice = async (req, res) => {
const {max, min, ruth} = req.query

  try {
    const products = await productsModel.searchByPrice(max, min, ruth)
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

exports.searchByCategories = async (req, res) => {
  const {category} = req.query
    try {
      const products = await productsModel.searchByCategories(category)
      return res.json({
        success: true,
        message: 'List All products',
        results: products
      })
    }catch(err){
      return res.status(500).json({
        success: false,
        message: err
      })
    }
  }


