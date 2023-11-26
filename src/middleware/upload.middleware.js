const multer = require('multer')
const path = require('path')



const storage = (dest, filename) => multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, path.join('upload', dest))
  },
  filename : (req, file, cb) => {
    const extention = {
      'image/jpeg' : 'jpeg',
      'image/png' : 'png'
    }
    if(!filename){
      filename = req.params.id
    }
    cb(null, `${filename}.${extention[file.mimetype]}`)
  }
})

// const filefilter = (req, file, cb) => {

//   console.log(file.originalname)
//   const ext = path.extname(file.originalname)
//   if(ext !== 'png' && ext !== 'jpeg'){
//     return cb(new Error('Only images are allowed'))
//   }
//   return cb(null, true)
// }

const uploadMiddleware = (type, file) => {

  const processUpload = multer ({
    // fileFilter: filefilter,
    storage : storage(type, file),
    limits : {fileSize: 2 * 1000 * 1000}
  })
  return processUpload
}

module.exports = uploadMiddleware