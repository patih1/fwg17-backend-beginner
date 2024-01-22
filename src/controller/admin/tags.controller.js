const tagsModel = require('../../models/tags.model')

exports.getAll = async (req, res) => {
  const {
    search,
    sortBy,
    order
  } = req.query

  let {page} = req.query

  if(!page){
    page = 1
  }

  try {
    const count = await tagsModel.countAll(search)
    const tags = await tagsModel.findAll(search, sortBy, order, page)

    const totalPage = Math.ceil(count / 10)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    return res.json({
      success: true,
      message: 'List All tags',
      pageInfo: {
        currentPage: Number(page),
        totalPage,
        nextPage: nextPage < totalPage ? nextPage : null,
        prevPage: prevPage < 1 ? null : prevPage,
        totalData: Number(count)
      },
      results: tags
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
  const tags = await tagsModel.findOne(id)

  if(!tags){
    return res.status(404).json({
      success: false,
      message: `tags not found`,
    })
  }

  return res.json({
    success: true,
    message: `Detail tags`,
    results: tags
  })
}

exports.create = async (req,res) => {
  try {
    const col = []
    const values = []
  
    function testnumber(str){
      return /^[0-9]/.test(str)
    }
  
    for(let i in req.body){
      if(testnumber(i) === false){
        values.push(req.body[i])
      }else {
        values.push(Number(req.body[i]))
      }
      
      col.push(`"${i}"`)
    }

    const tags = await tagsModel.insert(col, values)
    return res.json({
      success: true,
      message: 'Create tags successfully',
      results: tags
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
    const col = []
    const values = [] 
    // values.push(Number(id))
  
    function testnumber(str){
      return /^[0-9]/.test(str)
    }
  
    for(let i in req.body){
      if(testnumber([i]) === false){
        values.push(req.body[i])
      }else {
        values.push(Number(req.body[i]))
      }
      
      col.push(`"${i}"=$${values.length+1}`)
    }

    const tags = await tagsModel.update(id, col, values)
    if(tags){
      return res.json({
        success: true,
        message: 'Update tags successfully',
        results: tags
      })
    }else{
      return res.status(404).json({
        success: false,
        message: 'tags not found'
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
        message: err.message
      })
    }
  }
}

exports.delete = async(req,res) => {
  const id = Number(req.params.id)
  const tags = await tagsModel.delete(id)
  try {
    if(tags){
      return res.json({
        success: true,
        message: `successfully delete tags`,
        results: tags
      })
    }else{
      return res.status(404).json({
        success: false,
        message: `tags not found`
      })
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: `Internal server error`
    })
  }
}