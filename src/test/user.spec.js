// const { expect, should, use } = require("chai");
// const { describe } = require("mocha");
// const userController = require('../controller/admin/users.controller');
// // const {findOneByEmail, findAll} = require('../models/users.model')

// const res = {
//   status : () => {
//     return res
//   },
//   json: (param1)=>{
//     return param1
//   }
// }

// describe('User Controller admin (get all)', ()=>{
//   let req = {
//     query: {}
//   }


//   it('should return object', async () => {
//     const listAll = await userController.getAllUsers(req, res)
//     expect(typeof listAll).to.be.eq('object')
//     expect(typeof listAll.results).to.be.eq('object')
//     expect(typeof listAll.pageInfo).to.be.eq('object')
//   })

//   it('should return true', async () => {
//     const listAll = await userController.getAllUsers(req, res)
//     expect(listAll.success).to.be.true
//   })
  
//   it('should return 10 data', async () => {
//     const listAll = await userController.getAllUsers(req, res)
//     expect(listAll.results.length).to.be.eq(10)  
//   })
  
//   it('default current page should be 1', async () => {
//     const listAll = await userController.getAllUsers(req, res)
//     expect(listAll.pageInfo.currentPage).to.be.eq(1)  
//   })
  
//   it('default next page should be 2', async () => {
//     const listAll = await userController.getAllUsers(req, res)
//     expect(listAll.pageInfo.nextPage).to.be.eq(2)  
//   })
  
//   it('default previous page should be null', async () => {
//     const listAll = await userController.getAllUsers(req, res)
//     expect(listAll.pageInfo.prevPage).to.be.eq(null)  
//   })
  
//   it('current page should be 2', async () => {
//     req.query.page = 2
//     const listAll = await userController.getAllUsers(req, res)
//     expect(listAll.pageInfo.currentPage).to.be.eq(2)  
//   })
  
//   it('should return no data when exceed the last page', async () => {
//     const page = await userController.getAllUsers(req, res)
//     req.query.page = page.pageInfo.totalPage + 1 
//     const listAll = await userController.getAllUsers(req, res)
//     expect(listAll.message).to.be.eq('no data')
//     expect(listAll.success).to.be.false
//   })

// })

// describe('User controller admin (get one)', ()=>{
//   let req = {
//     params : {
//       id: 1
//     }
//   }

//   it('should return object', async () => {
//     const listAll = await userController.detailUser(req, res)
//     expect(typeof listAll).to.be.eq('object')
//     expect(typeof listAll.results).to.be.eq('object')
//   })

//   it('should return true', async () => {
//     const listAll = await userController.detailUser(req, res)
//     expect(listAll.success).to.be.true
//   })

//   it('should return false', async () => {
//     req.params.id = 0
//     const listAll = await userController.detailUser(req, res)
//     expect(listAll.success).to.be.false
//   })

//   it('should error when user not found', async () => {
//     req.params.id = 0
//     const listAll = await userController.detailUser(req, res)
//     expect(listAll.message).to.be.eq('User not found')
//   })
// })

// describe('User controller admin (create)', ()=>{
//   let req = {
//     headers: {
//       ['content-type'] : 'multipart',
//       ['transfer-encoding'] : '',
//     },
//     body: {
//       password: "imsquid",
//       fullName: "Test Case"
//     },
//     file: {}
//   }

//   it('should return object', async ()=>{
//     req.body.email = Date.now() + "@gmail.com"
//     const create = await userController.createUsers(req, res)
//     expect(typeof create).to.be.eq('object')
//   })

//   it('should return true', async ()=>{
//     req.body.email = Date.now() + "@gmail.com"
//     const create = await userController.createUsers(req, res)
//     expect(create.success).to.be.true
//   })

//   it("should error when email already exist", async ()=>{
//     req.body.email = "squid@mail.com"
//     const create = await userController.createUsers(req, res)
//     expect(create.success).to.be.false
//     expect(create.message).to.be.eq("Email already used")
//   })

//   it("should error when email, fullName, or password empty", async ()=>{
//     req.body.email = null
//     let create = await userController.createUsers(req, res)
//     expect(create.success).to.be.false
//     expect(create.message).to.be.eq("fullName, password, email cannot be empty")
//     req.body.email = Date.now() + "@gmail.com"
//     req.body.password = null
//     create = await userController.createUsers(req, res)
//     expect(create.success).to.be.false
//     expect(create.message).to.be.eq("fullName, password, email cannot be empty")
//     req.body.email = Date.now() + "@gmail.com"
//     req.body.password = '123'
//     req.body.fullName = null
//     create = await userController.createUsers(req, res)
//     expect(create.success).to.be.false
//     expect(create.message).to.be.eq("fullName, password, email cannot be empty")
//   })

//   it("should return default error", async ()=>{
//     req.body.fullName = 'Test Case'
//     req.body.error = 'default error'
//     const create = await userController.createUsers(req, res)
//     expect(create.success).to.be.false
//     expect(create.message).to.be.eq("default error")
//   })
// })

// describe('User controller admin (update)', ()=>{

//   let req = {
//     headers: {
//       ['content-type'] : 'multipart',
//       ['transfer-encoding'] : '',
//     },
//     body: {
//       fullName: "First Admin",
//       password: "123"
//     },
//     params: {
//       id: 1
//     }
//   }

//   it('should return object', async ()=>{
//     const update = await userController.updateUser(req, res)
//     expect(typeof update).to.be.eq('object')
//   })

//   it('should return true', async ()=>{
//     req.body.fullName = "Admin"
//     const update = await userController.updateUser(req, res)
//     expect(update.success).to.be.true
//   })
  
//     it('should return error when email already used', async ()=>{
//       req.body.email = "squid@mail.com"
//       const update = await userController.updateUser(req, res)
//       expect(update.success).to.be.false
//       expect(update.message).to.be.eq('Email already used')
//     })

//   it('should return false', async ()=>{
//     req.params.id = 0
//     const update = await userController.updateUser(req, res)
//     expect(update.success).to.be.false
//   })

//   it('should return default error', async ()=>{
//     req.body.error = 'default error'
//     req.params.id = 1
//     const update = await userController.updateUser(req, res)
//     expect(update.success).to.be.false
//     expect(update.message).to.be.eq("default error")
//   })
// })

// describe('User controller admin (delete)', ()=>{
//   let req = {
//     headers: {
//       ['content-type'] : 'multipart',
//       ['transfer-encoding'] : '',
//     },
//     body: {
//       fullName: "Test Case",
//       password: "deleted"
//     },
//     params: {}
//   }

//   it('should return object', async () => {
//     req.body.email = Date.now() + "@gmail.com"
//     const user = await userController.createUsers(req, res)
//     req.params.id = user.results.id
//     const del = await userController.deleteUser(req, res)
//     expect(typeof del).to.be.eq('object')
//   })

//   it('should return true', async () => {
//     req.body.email = Date.now() + "@gmail.com"
//     const user = await userController.createUsers(req, res)
//     req.params.id = user.results.id
//     const del = await userController.deleteUser(req, res)
//     expect(del.success).to.be.true
//   })

//   it('should error when user not found', async () => {

//     req.params.id = 0
//     const del = await userController.deleteUser(req, res)
//     expect(del.success).to.be.false
//     expect(del.message).to.be.eq('user not found')
//   })

//   it('should return default error', async ()=>{
//     req.body.error = 'default error'
//     const de = await userController.deleteUser(req, res)
//     expect(de.success).to.be.false
//     expect(de.message).to.be.eq("default error")
//   })
  
// })

// // describe('user model (find all)', () => {

// //   it('should return object', async () => {
// //     let findAllLocal = await findAll()
// //     expect(typeof findAllLocal).to.be.eq('object')
// //     findAllLocal = await findAll('', 'createdAt')
// //     expect(typeof findAllLocal).to.be.eq('object')
// //     findAllLocal = await findAll('', 'id', 'desc')
// //     expect(typeof findAllLocal).to.be.eq('object')
// //   })

// // })

// // describe('user model (find one)', () => {

// //   it('should return object', async () => {
// //     const findAll = await userModel.findOne(1)
// //     expect(typeof findAll).to.be.eq('object')
// //   })

// //   it('should return user with id 1', async () => {
// //     const findAll = await userModel.findOne(1)
// //     expect(findAll.id).to.be.eq(1)
// //   })

// //   it('should return undefined', async () => {
// //     const findAll = await userModel.findOne(0)
// //     expect(findAll).to.be.eq(undefined)
// //   })

// // })

// // describe('user model (find one by email)', () => {

// //   it('should return object', async () => {
// //     const findAll = await findOneByEmail('squid@mail.com')
// //     expect(typeof findAll).to.be.eq('object')
// //   })

// //   it('should return user with email squid@mail.com', async () => {
// //     const findAll = await findOneByEmail('squid@mail.com')
// //     expect(findAll.email).to.be.eq('squid@mail.com')
// //   })

// //   it('should return undefined', async () => {
// //     const findAll = await findOneByEmail('notfound@mail.com')
// //     expect(findAll).to.be.eq(undefined)
// //   })

// // })


