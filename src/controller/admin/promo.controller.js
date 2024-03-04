const promoModel = require('../../models/promo.model')

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
    const promo = await promoModel.findAll(search, sortBy, order, page)
    if(promo.length < 1){
      throw new Error('no data')
    }
    
    const count = await promoModel.countAll(search)
    const totalPage = Math.ceil(count / 10)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    return res.json({
      success: true,
      message: 'List All promo',
      pageInfo: {
        currentPage: Number(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage < 1 ? null : prevPage,
        totalData: Number(count)
      },
      results: promo
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
  const promo = await promoModel.findOne(id)

  if(!promo){
    return res.status(404).json({
      success: false,
      message: `promo not found`,
    })
  }

  return res.json({
    success: true,
    message: `Detail promo`,
    results: promo
  })
}

exports.create = async (req,res) => {
  try {
    const promo = await promoModel.insert(req.body)
    return res.json({
      success: true,
      message: 'Create promo successfully',
      results: promo
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
    const promo = await promoModel.update(id, req.body)
    if(promo){
      return res.json({
        success: true,
        message: 'Update promo successfully',
        results: promo
      })
    }else{
      return res.status(404).json({
        success: false,
        message: 'promo not found'
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
  const promo = await promoModel.delete(id)
  try {
    if(promo){
      return res.json({
        success: true,
        message: `successfully delete promo`,
        results: promo
      })
    }else{
      return res.status(404).json({
        success: false,
        message: `promo not found`
      })
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    })
  }
}