const db = require('../lib/db.lib')

exports.findAll = async (num, sortBy='id', order='asc', page=1)=>{
  const visibleColumn = ['id','createdAt']
  const allowOrder = ['asc', 'desc']
  const limit = 10
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

  let rows
  if(num){
    const sql = `SELECT *
    FROM "productCategories" WHERE "categoryId" = $1
    ORDER BY ${sort} ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    const values = [Number(num)]
    rows = (await db.query(sql,values)).rows
  }else{
    const sql = `SELECT *
    FROM "productCategories"
    ORDER BY ${sort} ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    rows = (await db.query(sql)).rows
  }
  return rows
}

exports.findOne = async (id)=>{
  const sql = `SELECT *
  FROM "productCategories" WHERE "id" = $1`
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
  const sql = `INSERT INTO "productCategories" (${col.join(', ')}) VALUES (${dollar.join(', ')}) RETURNING *`
  const {rows} = await db.query(sql,values)
  return rows[0]
}


exports.update = async (id, data)=>{
  const col = []
  const values = [] 
  values.push(Number(id))

  function testnumber(str){
    return /^[0-9]/.test(str)
  }

  for(let i in data){
    if(testnumber([i]) === false){
      values.push(data[i])
    }else {
      values.push(Number(data[i]))
    }
    
    col.push(`"${i}"=$${values.length}`)
  }
  
  const sql = `UPDATE "productCategories" SET ${col.join(', ')}, "updatedAt" = now() WHERE "id" = $1 
  RETURNING *`
  const {rows} = await db.query(sql,values)
  return rows[0] 
}

exports.delete = async (id)=>{
  const sql = `DELETE FROM "productCategories" WHERE "id" = $1 RETURNING *`
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.countAll = async (num)=>{
  let rows
  if(num){
    const sql = `SELECT count(id) AS counts 
    FROM "productCategories"
    WHERE "categoryId" ILIKE $1
    `
  const values = [Number(num)]
  rows = (await db.query(sql,values)).rows
  }else{
    const sql = `SELECT count(id) AS counts 
    FROM "productCategories"
    `
    rows = (await db.query(sql)).rows
  }

  return rows[0].counts
}