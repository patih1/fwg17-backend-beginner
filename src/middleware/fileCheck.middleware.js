const fs = require('fs/promises')

const check = async (path) => {
  try {
    await fs.access(path, fs.constants.F_OK)
    return true
  } catch(err){
    return false
  }
}

module.exports = check