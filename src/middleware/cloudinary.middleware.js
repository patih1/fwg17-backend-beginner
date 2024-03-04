const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2

const storage = (dest) => new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: `coffe-backend/${dest}`,
    format: async (req, file) => 'png'
  }
})

const uploadMiddleware = (type, file) => {
  const upload =  multer({
    storage:storage(type),
    fileFilter: (req, file, cb) => {
      const extention = ['image/jpeg', 'image/png', 'image/jpg']
      if(!extention.includes(file.mimetype)){
        cb(new Error('wrong ext'), false)
      }else{
        cb(null, true)
      }
    },
    limits: {
      fileSize: 2 * 1024 * 1024
    }
  })
  return upload
}

module.exports = uploadMiddleware