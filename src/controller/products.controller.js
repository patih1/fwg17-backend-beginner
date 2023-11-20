const productsModel = require('../models/products.model')

exports.getAll = async (req, res) => {
  try {
    const products = await productsModel.findAll()
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
      result: products
    })
  }

  return res.json({
    success: true,
    message: `Detail products`,
    result: products
  })
}

exports.create = async (req,res) => {
  try {
    const products = await productsModel.insert(req.body)
    return res.json({
      success: true,
      message: 'Create product successfully',
      result: products
    })
  }catch(err){
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

exports.update = async (req,res) => {
  const {id} = req.params
  try {
    const products = await productsModel.update(id, req.body)
    return res.json({
      success: true,
      message: 'Update product successfully',
      result: products
    })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: `Product not found`
    })
  }
}

exports.delete = async(req,res) => {
  const id = Number(req.params.id)
  const products = await productsModel.delete(id)
  try {
    return res.json({
      success: true,
      message: `successfully delete product`,
      result: products
    })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: `Product not found`
    })
  }
}