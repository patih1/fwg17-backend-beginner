// const { expect } = require("chai");
// const { describe } = require("mocha");
// const authController = require('../controller/auth.controller')

// describe('Auth Controller (login)', ()=>{
//   const res = {
//     status : (status) => {
//       return res
//     },
//     json: (param1)=>{
//       return param1
//     }
//   }

//   let req = {
//     body: {
//       email: "squid@mail.com",
//       password: "imsquid"
//     }
//   }

//   it('should return object', async ()=>{
//     const login = await authController.login(req, res)
//     expect(typeof login).to.be.eq('object')
//     expect(typeof login.results).to.be.eq('object')
//   })
  
//   it('should return true', async ()=>{
//     const login = await authController.login(req, res)
//     expect(login.success).to.be.true
//   })

//   it("should error when email not found", async () => {
//     req.body.email = "not found"
//     const login = await authController.login(req, res)
//     expect(login.success).to.be.false
//   })
  
//   it("should error when password doesn't match", async ()=>{
//     req = {
//       body: {
//         email: "squid@mail.com",
//         password: "imsqui"
//       }
//     }
//     const login = await authController.login(req, res)
//     expect(login.success).to.be.false
//     expect(login.message).to.be.eq("wrong email or password")
//   })

// })

// describe('Auth Controller (register)', ()=>{
//   const res = {
//     status : (status) => {
//       return res
//     },
//     json: (param1)=>{
//       return param1
//     }
//   }

//   let req = {
//     body: {
//       password: "imsquid",
//       fullName: "Test Case"
//     }
//   }

//   it('should return object', async ()=>{
//     req.body.email = Date.now() + "@gmail.com"
//     const register = await authController.register(req, res)
//     expect(typeof register).to.be.eq('object')
//   })
  
//   it('should return true', async ()=>{
//     req.body.email = Date.now() + "@gmail.com"
//     const register = await authController.register(req, res)
//     expect(register.success).to.be.true
//   })

//   it("should error when email already exist", async ()=>{
//     req = {
//       body: {
//         email: "squid@mail.com",
//         password: "imsquid",
//         fullName: "Test Case"
//       }
//     }
//     const register = await authController.register(req, res)
//     expect(register.success).to.be.false
//     expect(register.message).to.be.eq("Email already used")
//   })

// })