const productsModel = require('../../models/products.model')

const uploadMiddleware = require('../../middleware/cloudinary.middleware')
const upload = uploadMiddleware('products').single('image')
const cloudinary = require('../../utils/cloudinary')
const rm = cloudinary.uploader

exports.getAll = async (req, res) => {
  const {
    search,
    sortBy,
    order
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
    const products = await productsModel.findAll(search, sortBy, order, page, Number(itemLimit))

    if(products.length < 1){
      throw new Error('no data')
    }

    const totalPage = Math.ceil(count / Number(itemLimit))
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

exports.create = async (req,res) => {

  return upload(req, res, async (err) =>{
    

    try {
      
      if(req.body.error == 'default error'){
        throw new Error(req.body.error)
      }

      if(req.file){
        req.body.image = req.file.path
      }

      if(err){
        throw err
      }
      const products = await productsModel.insert(req.body)
  
      return res.json({
        success: true,
        message: 'Create product successfully',
        results: products
      })
    }catch(err){
      switch(err.code || err.message){
        case 'LIMIT_FILE_SIZE':
          return res.status(400).json({
            success: false,
            message: err.message
          })
        break;
        case 'wrong ext':
          return res.status(400).json({
            success: false,
            message: err.message
          })
        break;
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
          message: err.message
        })
      }
    }
  })
 
}


exports.update = async (req,res) => {
  return upload(req, res, async (err) => {

  try {
    if(req.body.error == 'default error'){
      throw new Error(req.body.error)
    }

    if(err){
      throw err
    }

  const {id} = req.params
  const data = await productsModel.findOne(id)

  if(req.file){
    if(data.image){
      rm
        .destroy(data.image.split('/').slice(-1).toString().split('.').slice(0, 1) ,{invalidate: true})
        .then(results => console.log(results))
    }
    req.body.image = req.file.path
  }


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
    switch(err.code || err.message){
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({
          success: false,
          message: err.message
        })
      break;
      case "wrong ext":
      return res.status(400).json({
        success: false,
        message: err.message
      })
      break;
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
  })

  
}

exports.delete = async(req,res) => {
  const id = Number(req.params.id)
  const products = await productsModel.delete(id)
  if(products && products.image){
    rm
      .destroy(products.image.split('/').slice(-1).toString().split('.').slice(0, 1) ,{invalidate: true})
      .then(results => console.log(results))
  }
  try {
    
    if(req.body.error == 'default error'){
      throw new Error(req.body.error)
    }

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
      message: err.message
    })
  }
}

// exports.searchByName = async(req,res) => {
//   const {search} = req.query
//   const products = await productsModel.searchByName(search)
//   try{
//     return res.json({
//       success: true,
//       message: 'Products sorted by name',
//       results: products
//     })
//   }catch(err){
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     })
//   }
// }



// exports.searchByPrice = async (req, res) => {
// const {max, min, ruth} = req.query

//   try {
//     const products = await productsModel.searchByPrice(max, min, ruth)
//     return res.json({
//       success: true,
//       message: 'List All products',
//       results: products
//     })
//   }catch(err){
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     })
//   }
// }

// exports.searchByCategories = async (req, res) => {
//   const {category} = req.query
//     try {
//       const products = await productsModel.searchByCategories(category)
//       return res.json({
//         success: true,
//         message: 'List All products',
//         results: products
//       })
//     }catch(err){
//       return res.status(500).json({
//         success: false,
//         message: err
//       })
//     }
//   }


