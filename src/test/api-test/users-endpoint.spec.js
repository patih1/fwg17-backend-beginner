// const { describe } = require("mocha");
// const superTest = require('supertest')
// const app = require('../../..');
// const { expect } = require("chai");
// const request = superTest(app)

// const Authorization = {Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwOTQ1MTU5NH0.EYyqO3HH2DUIDlZ67ODAcRUMQLkscuKdRFtc5HYXXzU"}

// describe('/users endpoint testing', ()  =>{
//   describe('GET /users', ()=>{

//     it('should return object',async ()=>{
//       const {body} = await request.get('/customer/users')
//       .set(Authorization)
//       expect(typeof body).to.be.eq('object')
//       expect(typeof body.results).to.be.eq('object')
//     })

//     it('should return true',async ()=>{
//       const {body} = await request.get('/customer/users')
//       .set(Authorization)
//       expect(body.success).to.be.true
//     })

//     it('should return Squidward Tentacles',async ()=>{
//       const {body} = await request.get('/customer/users')
//       .set(Authorization)
//       expect(body.results.fullName).to.be.eq('Squidward Tentacles')
//     })
//   })

//   describe('PATCH /users', ()=>{
//     it('should return object',async ()=>{
//       const {body} = await request.patch('/customer/users')
//       .field('phoneNumber', '+1234123123')
//       .set(Authorization)
//       expect(typeof body).to.be.eq('object')
//       expect(typeof body.results).to.be.eq('object')
//     })

//     it('should return true',async ()=>{
//       const {body} = await request.patch('/customer/users')
//       .field('phoneNumber', '+1234123123')
//       .set(Authorization)
//       expect(body.success).to.be.true
//     })

//     it('phone number should be changed',async ()=>{
//       const {body} = await request.patch('/customer/users')
//       .field('phoneNumber', '+1234123123')
//       .set(Authorization)
//       expect(body.results.phoneNumber).to.be.eq('+1234123123')
//     })

//     // it('should return success',async ()=>{
//     //   const {body} = await request.patch('/customer/users')
//     //   .field('phoneNumber', '+1234123123')
//     //   .attach('picture', 'upload/users/updateProfile.png')
//     //   .set(Authorization)
//     //   expect(body.success).to.be.true
//     // })
//   })
// })