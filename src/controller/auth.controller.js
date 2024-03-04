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

      const token = jwt.sign(payload, process.env.APP_SECRET)

        return res.json({
          success: true,
          message: 'login successfully',
            results: {
              token: token
            }
        })


  }catch(err){
      return res.status(401).json({
        success: false,
        message: 'wrong email or password'
      })
  }

}


exports.register = async (req, res) => {
  try{
    const {fullName, email, password} = req.body
    const hashedPassword = await argon.hash(password)
    await userModel.insert({
      fullName,
      email,
      password: hashedPassword
    })

    return res.json({
      success: true,
      message: `Registered successfully`
    })
  }catch(err){
      return res.status(411).json({
        success: false,
        message: 'Email already used'
      })

    
  }
}
