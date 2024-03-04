const db = require('../lib/db.lib')

exports.findAll = async (keyword='', sortBy='id', order, page=1)=>{
  const visibleColumn = ['id','createdAt', 'fullName']
  const allowOrder = ['asc', 'desc']
  const limit = 10
  const offset = (page - 1) * limit
  let sort
  
  order = allowOrder.includes(order) ? order : 'asc'
  sort = visibleColumn.includes(sortBy) ? sortBy : 'id'
  sort = `"${sort}"`

  const sql = `SELECT *
  FROM "users" WHERE "fullName" ILIKE $1
  ORDER BY ${sort} ${order}
  LIMIT ${limit} OFFSET ${offset}
  `
  const values = [`%${keyword}%`]
  const {rows} = await db.query(sql,values)
  return rows
}

exports.findOne = async (id)=>{
  const sql = `SELECT * FROM "users" WHERE "id" = $1`
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.findOneByEmail = async (email)=>{
  const sql = `SELECT * FROM "users" WHERE "email" = $1`
  const values = [email]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.insert = async (data)=>{
  const col = []
  const values = []
  const dollar = []

  for(let i in data){
    values.push(data[i])
    
    col.push(`"${i}"`)
    dollar.push(`$${values.length}`)
  }
  
  const sql = `INSERT INTO "users" (${col.join(', ')}) VALUES (${dollar.join(', ')}) returning *`
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.update = async (id, data)=>{
  const col = []
  const values = []
  values.push(Number(id))

  for(let i in data){
    if(data[i]){
      values.push(data[i])
      
      
      col.push(`"${i}"=$${values.length}`)
    }
  }
  
  const sql = `UPDATE "users" SET ${col.join(', ')}, "updatedAt" = now() WHERE "id" = $1 RETURNING *`
  const {rows} = await db.query(sql,values)
  return rows[0] 
}

exports.delete = async (id)=>{
  const sql = `DELETE FROM "users" WHERE "id" = $1 RETURNING *`
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.countAll = async (keyword='')=>{
  const sql = `SELECT count(id) AS counts 
  FROM "users"
  WHERE "fullName" ILIKE $1
  `
  const values = [`%${keyword}%`]
  const {rows} = await db.query(sql,values)
  return rows[0].counts
}