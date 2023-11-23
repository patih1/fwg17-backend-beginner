const argon = require('argon2')
const userModel = require('../models/users.model')

// export function login
exports.login = (req, res) => {
  // destructuring username & password dari body
  const {username,password} = req.body
 

  // jika email dan password sesuai dengan statement if, maka response dalam json, message login success
  if(username === "admin@mail.com" && password === "1234"){
    return res.json ({
      success: true,
      message: 'Login success'
    })
  } else{ // jika email dan/atau password tidak sesuai dengan statement if, maka response dalam json, message Wrong username or password
    return res.json ({
      success: false,
      message: "Wrong username or password"
    })
  }
}


exports.register = async (req, res) => {
  try{
    const {fullName, email, password} = req.body
    const hashedPassword = await argon.hash(password)
    const user = userModel.insert({
      fullName,
      email,
      password: hashedPassword
    })
    return res.json({
      success: true,
      message: `${user.fullName}Registered successfully`
    })
  }catch(err){
    return res.json({
      success: false,
      message: err.message
    })
    
  }
}
