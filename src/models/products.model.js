const db = require('../lib/db.lib')

exports.findAll = async ()=>{
  const sql = `SELECT "id", "name", "description", "basePrice", "image", "createdAt"
  FROM "products"`
  const values = []
  const {rows} = await db.query(sql,values)
  return rows
}



exports.findOne = async (id)=>{
  const sql = `SELECT "id", "name", "description", "basePrice", "image", "createdAt"
  FROM "products" WHERE "id" = $1`
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
    if(testnumber([i]) === false){
      values.push(data[i])
    }else {
      values.push(Number(data[i]))
    }
    
    col.push(`"${i}"`)
    dollar.push(`$${values.length}`)
  }
  console.log(col)
  const sql = `INSERT INTO "products" (${col.join(', ')}) VALUES (${dollar.join(', ')}) returning *`
  const {rows} = await db.query(sql,values)
  return rows[0]
}


exports.update = async (id, data)=>{
  const col = []
  const values = [] //kopi
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
  console.log(col)
  const sql = `UPDATE "products" SET ${col.join(', ')}, "updatedAt" = now() WHERE "id" = $1 RETURNING *`
  const {rows} = await db.query(sql,values)
  return rows[0] 
}

exports.delete = async (id)=>{
  const sql = `DELETE FROM "products" WHERE "id" = $1`
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.searchByName = async(keyword) => {
  const sql = `SELECT "id", "name", "description", "basePrice", "image", "createdAt"
  FROM "products" WHERE "name" ILIKE $1
  `
  const values = [`%${keyword}%`]
  const {rows} = await db.query(sql,values)
  return rows
}

exports.searchByPrice = async(max = 1000000, min = 0, ruth) => {

  const allowOrder = ['asc', 'desc']

  ruth = allowOrder.includes(ruth) ? ruth : 'asc'
  
  const sql = `SELECT "id", "name", "description", "basePrice", "image", "createdAt"
  FROM "products" WHERE "basePrice" <= $1 AND "basePrice" >= $2 
  ORDER BY "basePrice" ${ruth}
  `
  const values = [max, min]
  const {rows} = await db.query(sql,values)
  return rows
}


exports.searchByCategories = async(category) => {

  // const allowOrder = ['asc', 'desc']

  // ruth = allowOrder.includes(ruth) ? ruth : 'asc'
  // console.log(category)
  const sql = `
  SELECT "p"."id", "p"."name", "p"."description", "p"."basePrice", "p"."image", "p"."createdAt", 
  "c"."name" AS "category" FROM "products" "p"
  JOIN "productCategories" "pc" ON "pc"."productId" = "p"."id"
  JOIN "categories" "c" ON "c"."id" = "pc"."categoryId" WHERE "c"."name" = $1
  `
  const values = [category]
  const {rows} = await db.query(sql,values)
  return rows
}

// exports.findAll2 = async (keyword='', sortBy, order, page=1)=>{
//   const visibleColumn = ['id','createdAt','name', 'basePrice']
//   const allowOrder = ['asc', 'desc']
//   const limit = 10
//   const offset = (page - 1) * limit

//   sortBy = visibleColumn.includes(sortBy) ? sortBy : 'id'
//   order = allowOrder.includes(order) ? order : 'asc'

//   const sql = `SELECT *
//   FROM "products" WHERE "name" ILIKE $1
//   ORDER BY ${sortBy} ${order}
//   LIMIT ${limit} OFFSET ${offset}
//   `
//   const values = [`%${keyword}%`]
//   const {rows} = await db.query(sql,values)
//   return rows
// }
