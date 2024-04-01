const db = require('../lib/db.lib')

exports.findAll = async (key=0, sortBy='id', order, page=1)=>{
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

  const sql = `SELECT *
  FROM "orderDetails" WHERE "orderId" > $1
  ORDER BY ${sort} ${order}
  `
  const values = [Number(key)]
  const {rows} = await db.query(sql,values)
  return rows
}

exports.findOne = async (id)=>{
  const sql = `SELECT *
  FROM "orderDetails" WHERE "id" = $1`
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.insert = async (data)=>{
  const values = [
    Number(data.productId), 
    Number(data.productSizeId), 
    Number(data.productVariantId), 
    Number(data.quantity), 
    Number(data.orderId),
  ]


  const sql = `insert into "orderDetails" ("productId", "productSizeId", "productVariantId", "quantity", "orderId", "subTotal")
  VALUES
  ($1, $2, $3, $4, $5, (select "basePrice" from "products" where "id" = $1) + (select "additionalPrice" from "productVariant" where "id" = $3) + (select "additionalPrice" from "productSize" where "id" = $2) * $4 - (select coalesce((select "discount" from "products" where "id" = $1), 0) * $4) )
  RETURNING *`
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
  
  const sql = `UPDATE "orderDetails" SET ${col.join(', ')}, "updatedAt" = now() WHERE "id" = $1 
  RETURNING *`
  const {rows} = await db.query(sql,values)
  return rows[0] 
}

exports.delete = async (id)=>{
  const sql = `DELETE FROM "orderDetails" WHERE "id" = $1 RETURNING *`
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows[0]
}





exports.findAllCs = async (key)=>{

  const sql = `select "p"."discount", "p"."name", "p"."id", "od"."subTotal", "od"."quantity", "pv"."name" as "variant", "ps"."size"
  from "products" "p"
  join "orderDetails" "od" on "od"."productId" = "p"."id"
  join "productVariant" pv ON "pv"."id" = "od"."productVariantId"
  join "productSize" ps ON "ps"."id" = "od"."productSizeId" where "orderId" = $1;
  `
  const values = [key]
  const {rows} = await db.query(sql,values)
  return rows
}

exports.countAll = async (key=0)=>{
  const sql = `SELECT count(id) AS counts 
  FROM "orderDetails"
  WHERE "orderId" > $1
  `
  const values = [Number(key)]
  const {rows} = await db.query(sql,values)
  return rows[0].counts
}