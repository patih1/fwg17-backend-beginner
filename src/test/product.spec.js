// const { expect, should, use } = require("chai");
// const { describe } = require("mocha");
// const productsController = require('../controller/admin/products.controller');

// const res = {
//   status : (status) => {
//     return res
//   },
//   json: (param1)=>{
//     return param1
//   }
// }

// describe('Product controller admin (get all)', ()=>{
//   let req = {
//     query: {}
//   }


//   it('should return object', async () => {
//     const listAll = await productsController.getAll(req, res)
//     expect(typeof listAll).to.be.eq('object')
//     expect(typeof listAll.results).to.be.eq('object')
//     expect(typeof listAll.pageInfo).to.be.eq('object')
//   })

//   it('should return true', async () => {
//     const listAll = await productsController.getAll(req, res)
//     expect(listAll.success).to.be.true
//   })
  
//   it('should return 6 data', async () => {
//     const listAll = await productsController.getAll(req, res)
//     expect(listAll.results.length).to.be.eq(6)  
//   })
  
//   it('default current page should be 1', async () => {
//     const listAll = await productsController.getAll(req, res)
//     expect(listAll.pageInfo.currentPage).to.be.eq(1)  
//   })
  
//   it('default next page should be 2', async () => {
//     const listAll = await productsController.getAll(req, res)
//     expect(listAll.pageInfo.nextPage).to.be.eq(2)  
//   })
  
//   it('default previous page should be null', async () => {
//     const listAll = await productsController.getAll(req, res)
//     expect(listAll.pageInfo.prevPage).to.be.eq(null)  
//   })
  
//   it('current page should be 2', async () => {
//     req.query.page = 2
//     const listAll = await productsController.getAll(req, res)
//     expect(listAll.pageInfo.currentPage).to.be.eq(2)  
//   })
  
//   it('should return no data when exceed the last page', async () => {
//     const page = await productsController.getAll(req, res)
//     req.query.page = page.pageInfo.totalPage + 1 
//     const listAll = await productsController.getAll(req, res)
//     expect(listAll.message).to.be.eq('no data')
//     expect(listAll.success).to.be.false
//   })

// })

// describe('Product controller admin (get one)', ()=>{
//   let req = {
//     params : {
//       id: 1
//     }
//   }

//   it('should return object', async () => {
//     const listAll = await productsController.detail(req, res)
//     expect(typeof listAll).to.be.eq('object')
//     expect(typeof listAll.results).to.be.eq('object')
//   })

//   it('should return true', async () => {
//     const listAll = await productsController.detail(req, res)
//     expect(listAll.success).to.be.true
//   })

//   it('should return false', async () => {
//     req.params.id = 0
//     const listAll = await productsController.detail(req, res)
//     expect(listAll.success).to.be.false
//   })

//   it('should error when product not found', async () => {
//     req.params.id = 0
//     const listAll = await productsController.detail(req, res)
//     expect(listAll.message).to.be.eq('product not found')
//   })
// })

// describe('Product controller admin (create)', ()=>{
//   let req = {
//     headers: {
//       ['content-type'] : 'multipart',
//       ['transfer-encoding'] : '',
//     },
//     body: {
//       description: "Test Case",
//       basePrice: 10000
//     },
//     file: {}
//   }

//   it('should return object', async ()=>{
//     req.body.name = Date.now() + "Coffee"
//     const create = await productsController.create(req, res)
//     expect(typeof create).to.be.eq('object')
//   })

//   it('should return true', async ()=>{
//     req.body.name = Date.now() + "Coffee"
//     const create = await productsController.create(req, res)
//     expect(create.success).to.be.true
//   })

//   it("should error when name already exist", async ()=>{
//     req.body.name = "Americano"
//     const create = await productsController.create(req, res)
//     expect(create.success).to.be.false
//     expect(create.message).to.be.eq("name is unique")
//   })

//   it("should error when name, description, or basePrice empty", async ()=>{
//     req.body.name = null
//     const create = await productsController.create(req, res)
//     expect(create.success).to.be.false
//     expect(create.message).to.be.eq("name, description, basePrice cannot be null")
//   })

//   it("should return default error", async ()=>{
//     req.body.description = 'Test Case'
//     req.body.error = 'default error'
//     const create = await productsController.create(req, res)
//     expect(create.success).to.be.false
//     expect(create.message).to.be.eq("default error")
//   })
// })

// describe('Product controller admin (update)', ()=>{

//   let req = {
//     headers: {
//       ['content-type'] : 'multipart',
//       ['transfer-encoding'] : '',
//     },
//     body: {
//       description: "Macchiato",
//       basePrice: 10000
//     },
//     params: {
//       id: 4
//     }
//   }

//   it('should return object', async ()=>{
//     const update = await productsController.update(req, res)
//     expect(typeof update).to.be.eq('object')
//   })

//   it('should return true', async ()=>{
//     const update = await productsController.update(req, res)
//     expect(update.success).to.be.true
//   })
  
//     it('should return error when name already used', async ()=>{
//       req.body.name = "Americano"
//       const update = await productsController.update(req, res)
//       expect(update.success).to.be.false
//       expect(update.message).to.be.eq('name is unique')
//     })

//   it('should return false', async ()=>{
//     req.params.id = 0
//     const update = await productsController.update(req, res)
//     expect(update.success).to.be.false
//   })

//   it('should return default error', async ()=>{
//     req.body.error = 'default error'
//     req.params.id = 4
//     const update = await productsController.update(req, res)
//     expect(update.success).to.be.false
//     expect(update.message).to.be.eq("default error")
//   })
// })

// describe('Product controller admin (delete)', ()=>{
//   let req = {
//     headers: {
//       ['content-type'] : 'multipart',
//       ['transfer-encoding'] : '',
//     },
//     body: {
//       description: "Macchiato",
//       basePrice: 10000
//     },
//     params: {}
//   }

//   it('should return object', async () => {
//     req.body.name = Date.now() + "Coffee"
//     const user = await productsController.create(req, res)
//     req.params.id = user.results.id
//     const del = await productsController.delete(req, res)
//     expect(typeof del).to.be.eq('object')
//   })

//   it('should return true', async () => {
//     req.body.name = Date.now() + "Coffee"
//     const user = await productsController.create(req, res)
//     req.params.id = user.results.id
//     const del = await productsController.delete(req, res)
//     expect(del.success).to.be.true
//   })

//   it('should error when product not found', async () => {

//     req.params.id = '0'
//     const del = await productsController.delete(req, res)
//     expect(del.success).to.be.false
//     expect(del.message).to.be.eq('Product not found')
//   })

//   it('should return default error', async ()=>{
//     req.body.error = 'default error'
//     const de = await productsController.delete(req, res)
//     expect(de.success).to.be.false
//     expect(de.message).to.be.eq("default error")
//   })
  
// })