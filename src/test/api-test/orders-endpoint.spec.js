// const { describe } = require("mocha");
// const superTest = require('supertest')
// const app = require('../../..');
// const { expect } = require("chai");
// const request = superTest(app)

// const Authorization = {Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwOTQ1MTU5NH0.EYyqO3HH2DUIDlZ67ODAcRUMQLkscuKdRFtc5HYXXzU"}

// describe('/orders endpoint testing', ()  =>{
//   describe('GET /orders', ()=>{

//     it('should return object',async ()=>{
//       const {body} = await request.get('/customer/orders').set(Authorization)
//       expect(typeof body).to.be.eq('object')
//       expect(typeof body.results).to.be.eq('object')
//       expect(typeof body.pageInfo).to.be.eq('object')
//     })

//     it('should return true',async ()=>{
//       const {body} = await request.get('/customer/orders').set(Authorization)
//       expect(body.success).to.be.true
//     })
  
//   // it('should return 6 data', async () => {
//   //   const {body} = await request.get('/customer/orders').set(Authorization)
//   //   expect(body.results.length).to.be.eq(6)  
//   // })
  
//   it('default current page should be 1', async () => {
//     const {body} = await request.get('/customer/orders').set(Authorization)
//     expect(body.pageInfo.currentPage).to.be.eq(1)  
//   })
  
//   it('default next page should be 2', async () => {
//     const {body} = await request.get('/customer/orders').set(Authorization)
//     expect(body.pageInfo.nextPage).to.be.eq(2)  
//   })
  
//   it('default previous page should be null', async () => {
//     const {body} = await request.get('/customer/orders').set(Authorization)
//     expect(body.pageInfo.prevPage).to.be.eq(null)  
//   })
  
//   it('should return no data when exceed the last page', async () => {
//     const {body} = await request.get(`/customer/orders?page=1000`).set(Authorization)
//     expect(body.message).to.be.eq('no data')
//     expect(body.success).to.be.false
//   })
//   })

//   describe('POST /orders', ()=>{

//     it('should return object', async ()=>{
//       const {body} = await request.post('/customer/orders').set(Authorization)
//       expect(typeof body).to.be.eq('object')
//     })

//     it('should return true', async ()=>{
//       const {body} = await request.post('/customer/orders').set(Authorization)
//       expect(body.success).to.be.true
//     })

//     it("should error when user id", async ()=>{
//       const {body} = await request.post('/customer/orders').set(Authorization)
//       expect(body.success).to.be.false
//       expect(body.message).to.be.eq("user id cannot be null")
//     })

//     it("should return default error", async ()=>{
//       const {body} = await request.post('/customer/orders').set(Authorization).field('error', 'default error')
//       expect(body.success).to.be.false
//       expect(body.message).to.be.eq("default error")
//     })
//   })
// })