const multer = require('multer')
const path = require('path')



const storage = (dest, filename) => multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, path.join('upload', dest))
  },
  filename : (req, file, cb) => {
    const extention = {
      'image/jpeg' : 'jpeg',
      'image/png' : 'png',
      'image/jpg' : 'jpg'
    }
    if(!filename && req.params.id){
      filename = req.params.id
    }else if(!filename){
      filename = new Date().getTime()
    }
    cb(null, `${filename}.${extention[file.mimetype]}`)
  }
})

const uploadMiddleware = (type, file) => {

  const processUpload = multer ({
    fileFilter: (req, file, cb) => {
      const extention = ['image/jpeg', 'image/png', 'image/jpg']
      if(!extention.includes(file.mimetype)){
        cb(new Error ('wrong ext'), false)
      }else{
        cb(null, true)
      }
      },
    storage : storage(type, file),
    limits : {fileSize: 2 * 1024 * 1024}
  })
  return processUpload
}

module.exports = uploadMiddleware