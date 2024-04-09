const db = require('../lib/db.lib')

exports.findAll = async (keyword='', sortBy='id', order, page=1, filter)=>{
  const visibleColumn = ['id','createdAt', 'name']
  const allowOrder = ['asc', 'desc']
  const limit = 4
  const offset = (page - 1) * limit
  let sort
  
  order = allowOrder.includes(order) ? order : 'asc'

  if(typeof sortBy === 'string'){
    sort = visibleColumn.includes(sortBy) ? sortBy : 'id'
    sort = `"${sort}"`
  }else{
    sort = visibleColumn.filter(value => sortBy.includes(value))
    sort = sort.join('","')
    sort = `"${sort}"`
  }

  if(filter === 'on-process' || filter === 'delivered' || filter === 'canceled' || filter === 'ready-to-pick'){
    filter = ` AND status = '${filter}'`
  }else{
    filter = ''
  }

  const sql = `SELECT *
  FROM "orders" WHERE "orderNumber" ILIKE $1${filter}
  ORDER BY ${sort} ${order}
  LIMIT ${limit} OFFSET ${offset}
  `
  const values = [`%${keyword}%`]
  const {rows} = await db.query(sql,values)
  return rows
}

exports.findOne = async (id)=>{
  const sql = `SELECT *
  FROM "orders" WHERE "id" = $1`
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.insert = async (data)=>{
  const col = []
  const values = []
  const dollar = []

  function testnumber(str){
    return /^[0-9]/.test(str)
  }

  for(let i in data){
    if(testnumber(i) === false){
      values.push(data[i])
    }else {
      values.push(Number(data[i]))
    }
    
    col.push(`"${i}"`)
    dollar.push(`$${values.length}`)
  }
  const sql = 
  `INSERT INTO "orders" (${col.join(', ')}) VALUES (${dollar.join(', ')}) RETURNING *`
  const {rows} = await db.query(sql,values)
  return rows[0]
}


exports.update = async (id, data)=>{
  const col = []
  const values = [] 
  let quer = ''
  values.push(Number(id))

  function testnumber(str){
    return /^[0-9]/.test(str)
  }

  if(data.total || data.taxAmount){
    quer = '"total" = (select sum("subTotal") from "orderDetails" where "orderId" = $1), "taxAmount" = (select sum("subTotal") from "orderDetails" where "orderId" = $1) * 0.1'
  }else{

    for(let i in data){
      if(testnumber([i]) === false){
        values.push(data[i])
      }else {
        values.push(Number(data[i]))
      }
      col.push(`"${i}"=$${values.length}`)
    }
  }
  // 
  const sql = `UPDATE "orders" SET ${col? col.join(', ') : ''} ${data.total ? quer : ''}, "updatedAt" = now() WHERE "id" = $1 
  RETURNING *`
  const {rows} = await db.query(sql,values)
  return rows[0] 
}

exports.delete = async (id)=>{
  const sql = `
  DELETE FROM "orders" WHERE "id" = $1 RETURNING *
  `
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.findAllCs = async (id, sortBy='id', order, page=1, filter)=>{
  const visibleColumn = ['id','createdAt', 'name']
  const allowOrder = ['asc', 'desc']
  const limit = 4
  const offset = (page - 1) * limit
  let sort
  
  order = allowOrder.includes(order) ? order : 'desc'

  if(typeof sortBy === 'string'){
    sort = visibleColumn.includes(sortBy) ? sortBy : 'id'
    sort = `"${sort}"`
  }else{
    sort = visibleColumn.filter(value => sortBy.includes(value))
    sort = sort.join('","')
    sort = `"${sort}"`
  }

  if(filter === 'on-process' || filter === 'delivered' || filter === 'canceled' || filter === 'ready-to-pick'){
    filter = ` AND status = '${filter}'`
  }else{
    filter = ''
  }

  const sql = `SELECT *
  FROM "orders" WHERE "userId" = $1${filter}
  ORDER BY ${sort} ${order}
  LIMIT ${limit} OFFSET ${offset}
  `
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows
}

exports.countAll = async (keyword='', filter)=>{
  
  if(filter === 'on-process' || filter === 'delivered' || filter === 'canceled' || filter === 'ready-to-pick'){
    filter = ` AND status = '${filter}'`
  }else{
    filter = ''
  }

  const sql = `SELECT count(id) AS counts 
  FROM "orders"
  WHERE "orderNumber" ILIKE $1${filter}
  `
  const values = [`%${keyword}%`]
  const {rows} = await db.query(sql,values)
  return rows[0].counts
}