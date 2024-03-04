const categoryModel = require('../../models/categories.model')

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
    const category = await categoryModel.findAll(search, sortBy, order, page)
    if(category.length < 1){
      throw new Error('no data')
    }
    
    const count = await categoryModel.countAll(search)
    const totalPage = Math.ceil(count / 10)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    return res.json({
      success: true,
      message: 'List All category',
      pageInfo: {
        currentPage: Number(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage < 1 ? null : prevPage,
        totalData: Number(count)
      },
      results: category
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
  const category = await categoryModel.findOne(id)

  if(!category){
    return res.status(404).json({
      success: false,
      message: `category not found`,
    })
  }

  return res.json({
    success: true,
    message: `Detail category`,
    results: category
  })
}

exports.create = async (req,res) => {
  try {
    const category = await categoryModel.insert(req.body)
    return res.json({
      success: true,
      message: 'Create category successfully',
      results: category
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
    const category = await categoryModel.update(id, req.body)
    if(category){
      return res.json({
        success: true,
        message: 'Update category successfully',
        results: category
      })
    }else{
      return res.status(404).json({
        success: false,
        message: 'category not found'
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
  const category = await categoryModel.delete(id)
  try {
    if(category){
      return res.json({
        success: true,
        message: `successfully delete category`,
        results: category
      })
    }else{
      return res.status(404).json({
        success: false,
        message: `category not found`
      })
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    })
  }
}