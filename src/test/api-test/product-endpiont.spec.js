// const { describe } = require("mocha");
// const superTest = require('supertest')
// const app = require('../../..');
// const { expect } = require("chai");
// const request = superTest(app)

// describe('/products endpoint testing', ()  =>{
//   describe('GET /products', ()=>{

//     it('should return object',async ()=>{
//       const {body} = await request.get('/products')
//       expect(typeof body).to.be.eq('object')
//       expect(typeof body.results).to.be.eq('object')
//       expect(typeof body.pageInfo).to.be.eq('object')
//     })

//     it('should return true',async ()=>{
//       const {body} = await request.get('/products')
//       expect(body.success).to.be.true
//     })
  
//   it('should return 6 data', async () => {
//     const {body} = await request.get('/products')
//     expect(body.results.length).to.be.eq(6)  
//   })
  
//   it('default current page should be 1', async () => {
//     const {body} = await request.get('/products')
//     expect(body.pageInfo.currentPage).to.be.eq(1)  
//   })
  
//   it('default next page should be 2', async () => {
//     const {body} = await request.get('/products')
//     expect(body.pageInfo.nextPage).to.be.eq(2)  
//   })
  
//   it('default previous page should be null', async () => {
//     const {body} = await request.get('/products')
//     expect(body.pageInfo.prevPage).to.be.eq(null)  
//   })
  
//   it('current page should be 2', async () => {
//     const {body} = await request.get('/products?page=2')
//     expect(body.pageInfo.currentPage).to.be.eq(2)  
//   })
  
//   it('should return no data when exceed the last page', async () => {
//     let {pageInfo} = await (await request.get('/products')).body
//     const {body} = await request.get(`/products?page=${pageInfo.totalPage + 1}`)
//     expect(body.message).to.be.eq('no data')
//     expect(body.success).to.be.false
//   })
//   })

//   describe('GET /products/:id', ()=>{

//     it('should return object', async () => {
//       const {body} = await request.get('/products/18')
//       expect(typeof body).to.be.eq('object')
//       expect(typeof body.results).to.be.eq('object')
//     })

//     it('should return true', async () => {
//       const {body} = await request.get('/products/18')
//       expect(body.success).to.be.true
//     })
  
//     it('should return false', async () => {
//       const {body} = await request.get('/products/0')
//       expect(body.success).to.be.false
//     })
  
//     it('should error when product not found', async () => {
//       const {body} = await request.get('/products/0')
//       expect(body.message).to.be.eq('product not found')
//     })
//   })
// })