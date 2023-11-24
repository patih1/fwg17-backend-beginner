const argon = require('argon2')
const userModel = require('../models/users.model')
const jwt = require('jsonwebtoken')

// export function login
exports.login = async (req, res) => {
  const {email, password} = req.body
  const user = await userModel.findOneByEmail(email)
  try{
    if(!user){
      throw Error('wrong')
    }

      const verify = await argon.verify(user.password, password)

    if(!verify){
      throw Error('wrong')
      }

      const payload = {
        id: user.id,
        role: user.role
      }

      const token = jwt.sign(payload, process.env.APP_SECRET || 'secretkey')

      if(verify){
        return res.json({
          success: true,
          message: 'login successfully',
            result: {
              token: token
            }
        })
      }


  }catch(err){
    switch(err.message || err.code){
      case 'wrong':
        return res.status(401).json({
          success: false,
          message: 'wrong email or password'
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


exports.register = async (req, res) => {
  try{
    const {fullName, email, password} = req.body
    const hashedPassword = await argon.hash(password)
    const user = await userModel.insert({
      fullName,
      email,
      password: hashedPassword
    })

    return res.json({
      success: true,
      message: `Registered successfully`
    })
  }catch(err){
    switch(err.code){
      case "23505":
        return res.status(411).json({
          success: false,
          message: 'Email already used'
        })
      break;
      default:
        return res.json({
        success: false,
        message: err.message
      })
    }
  }
}
