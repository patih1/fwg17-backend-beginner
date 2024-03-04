const { expect, should, use } = require("chai");
const { describe } = require("mocha");
const messageController = require('../controller/admin/message.controller');

const res = {
  status : (status) => {
    return res
  },
  json: (param1)=>{
    return param1
  }
}

describe('Message controller admin (get all)', ()=>{
  let req = {
    query: {}
  }


  it('should return object', async () => {
    const listAll = await messageController.getAll(req, res)
    expect(typeof listAll).to.be.eq('object')
    expect(typeof listAll.results).to.be.eq('object')
    expect(typeof listAll.pageInfo).to.be.eq('object')
  })

  it('should return true', async () => {
    const listAll = await messageController.getAll(req, res)
    expect(listAll.success).to.be.true
  })
  
  it('should return 10 data', async () => {
    const listAll = await messageController.getAll(req, res)
    expect(listAll.results.length).to.be.eq(10)  
  })
  
  it('default current page should be 1', async () => {
    const listAll = await messageController.getAll(req, res)
    expect(listAll.pageInfo.currentPage).to.be.eq(1)  
  })
  
  it('default next page should be 2', async () => {
    const listAll = await messageController.getAll(req, res)
    expect(listAll.pageInfo.nextPage).to.be.eq(2)  
  })
  
  it('default previous page should be null', async () => {
    const listAll = await messageController.getAll(req, res)
    expect(listAll.pageInfo.prevPage).to.be.eq(null)  
  })
  
  it('current page should be 2', async () => {
    req.query.page = 2
    const listAll = await messageController.getAll(req, res)
    expect(listAll.pageInfo.currentPage).to.be.eq(2)  
  })
  
  it('should return no data when exceed the last page', async () => {
    const page = await messageController.getAll(req, res)
    req.query.page = page.pageInfo.totalPage + 1 
    const listAll = await messageController.getAll(req, res)
    expect(listAll.message).to.be.eq('no data')
    expect(listAll.success).to.be.false
  })

})

describe('Message controller admin (get one)', ()=>{
  let req = {
    params : {
      id: 1
    }
  }

  it('should return object', async () => {
    const listAll = await messageController.detail(req, res)
    expect(typeof listAll).to.be.eq('object')
    expect(typeof listAll.results).to.be.eq('object')
  })

  it('should return true', async () => {
    const listAll = await messageController.detail(req, res)
    expect(listAll.success).to.be.true
  })

  it('should return false', async () => {
    req.params.id = 0
    const listAll = await messageController.detail(req, res)
    expect(listAll.success).to.be.false
  })

  it('should error when message not found', async () => {
    req.params.id = 0
    const listAll = await messageController.detail(req, res)
    expect(listAll.message).to.be.eq('message not found')
  })
})

describe('Message controller admin (create)', ()=>{
  let req = {
    body: {
      recipientId: 2,
      senderId: 4,
      text: 'Test Case'
      }
  }

  it('should return object', async ()=>{
    const create = await messageController.create(req, res)
    expect(typeof create).to.be.eq('object')
  })

  it('should return true', async ()=>{
    const create = await messageController.create(req, res)
    expect(create.success).to.be.true
  })

  it("should error when user id", async ()=>{
    req.body.recipientId = null
    const create = await messageController.create(req, res)
    expect(create.success).to.be.false
    expect(create.message).to.be.eq("user id cannot be null")
  })

  it("should return default error", async ()=>{
    req.body.error = 'default error'
    const create = await messageController.create(req, res)
    expect(create.success).to.be.false
    expect(create.message).to.be.eq("default error")
  })
})

describe('Message controller admin (update)', ()=>{

  let req = {
    body: {
    recipientId: 2,
    senderId: 4,
    text: 'Test Case'
    },
    params: {
      id: 4
    }
  }

  it('should return object', async ()=>{
    const update = await messageController.update(req, res)
    expect(typeof update).to.be.eq('object')
  })

  it('should return true', async ()=>{
    const update = await messageController.update(req, res)
    expect(update.success).to.be.true
  })

  it('should return false', async ()=>{
    req.params.id = 0
    const update = await messageController.update(req, res)
    expect(update.success).to.be.false
  })

  it('should return default error', async ()=>{
    req.body.error = 'default error'
    req.params.id = 4
    const update = await messageController.update(req, res)
    expect(update.success).to.be.false
    expect(update.message).to.be.eq("default error")
  })
})

describe('Message controller admin (delete)', ()=>{
  let req = {
    body: {
      recipientId: 2,
      senderId: 4,
      text: 'Test Case'
      },
    params: {}
  }

  it('should return object', async () => {
    const user = await messageController.create(req, res)
    req.params.id = user.results.id
    const del = await messageController.delete(req, res)
    expect(typeof del).to.be.eq('object')
  })

  it('should return true', async () => {
    const user = await messageController.create(req, res)
    req.params.id = user.results.id
    const del = await messageController.delete(req, res)
    expect(del.success).to.be.true
  })

  it('should error when product not found', async () => {

    req.params.id = 0
    const del = await messageController.delete(req, res)
    expect(del.success).to.be.false
    expect(del.message).to.be.eq('message not found')
  })

  it('should return default error', async ()=>{
    req.body.error = 'default error'
    const de = await messageController.delete(req, res)
    expect(de.success).to.be.false
    expect(de.message).to.be.eq("default error")
  })
  
})