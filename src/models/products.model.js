const db = require('../lib/db.lib')

exports.findAll = async (keyword='', sortBy='id', order, page=1, itemLimit=6, recommended, filter)=>{
  const visibleColumn = ['id', 'createdAt', 'name', `basePrice`]
  const allowOrder = ['asc', 'desc']
  const allowFilter = ['coffee', 'non coffee', 'food']
  const limit = itemLimit
  const offset = (page - 1) * limit
  let sort
  
  if(typeof sortBy === 'string'){
    sort = visibleColumn.includes(sortBy) ? sortBy : 'id'
    sort = `"${sort}"`
  }else{
    sort = visibleColumn.filter(value => sortBy.includes(value))
    sort = sort.join('","')
    sort = `"${sort}"`
  }
  
  let recomend = ''
  
  order = allowOrder.includes(order) ? order : sortBy === 'createdAt' ? 'desc' : 'asc'
  
  if(recommended){
    recomend = 'AND "isRecommended" = true'
  }

  if(filter && (filter.includes('coffee') || filter.includes('non coffee') || filter.includes('food'))){
    if(filter.includes(',')){
      filter = filter.split(',')
      let temp = ''
      for(let i = 0; i < filter.length; i++){
        if(i == 0){
          temp += ` AND (c.name = '${filter[i]}'`
        }else{
          temp += ` OR c.name = '${filter[i]}'`
        }
      }
      filter = temp + ')'
    }else{
      filter = ` AND c.name = '${filter}'`
    }
  }else{
    filter = ''
  }

  const sql = `select p.id, p.name, p."basePrice", p.description, p.image, p.discount, p."isRecommended",
  array_agg(distinct c.name ) "category"
  from products p
  left join "productCategories" pr on p.id = pr."productId"
  left join "categories" c on pr."categoryId" = c.id
  where p."name" ILIKE $1 ${recomend}${filter}
  group by p.id, p.name, p."basePrice", p.description, p.image, p.discount, p."isRecommended"
  ORDER BY "p".${sort} ${order}
  LIMIT ${limit} OFFSET ${offset}
  `
  const values = [`%${keyword}%`]
  const {rows} = await db.query(sql,values)
  return rows
}

exports.countAll = async (keyword='')=>{
  const sql = `SELECT count(id) AS counts 
  FROM "products"
  WHERE "name" ILIKE $1
  `
  const values = [`%${keyword}%`]
  const {rows} = await db.query(sql,values)
  return rows[0].counts
}

exports.findOne = async (id)=>{
  const sql = `SELECT *
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
  const sql = `INSERT INTO "products" (${col.join(', ')}) VALUES (${dollar.join(', ')}) returning *`
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
  
  const sql = `UPDATE "products" SET ${col.join(', ')}, "updatedAt" = now() WHERE "id" = $1 RETURNING *`
  const {rows} = await db.query(sql,values)
  return rows[0] 
}

exports.delete = async (id)=>{
  const sql = `DELETE FROM "products" WHERE "id" = $1 RETURNING *`
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

// exports.searchByName = async(keyword) => {
//   const sql = `SELECT "id", "name", "description", "basePrice", "image", "createdAt"
//   FROM "products" WHERE "name" ILIKE $1
//   `
//   const values = [`%${keyword}%`]
//   const {rows} = await db.query(sql,values)
//   return rows
// }

// exports.searchByPrice = async(max = 1000000, min = 0, ruth) => {

//   const allowOrder = ['asc', 'desc']

//   ruth = allowOrder.includes(ruth) ? ruth : 'asc'
  
//   const sql = `SELECT "id", "name", "description", "basePrice", "image", "createdAt"
//   FROM "products" WHERE "basePrice" <= $1 AND "basePrice" >= $2 
//   ORDER BY "basePrice" ${ruth}
//   RETURNING *
//   `
//   const values = [max, min]
//   const {rows} = await db.query(sql,values)
//   return rows
// }


// exports.searchByCategories = async(category) => {
//   const sql = `
//   SELECT "p"."id", "p"."name", "p"."description", "p"."basePrice", "p"."image", "p"."createdAt", 
//   "c"."name" AS "category" FROM "products" "p"
//   JOIN "productCategories" "pc" ON "pc"."productId" = "p"."id"
//   JOIN "categories" "c" ON "c"."id" = "pc"."categoryId" WHERE "c"."name" = $1
//   `
//   const values = [category]
//   const {rows} = await db.query(sql,values)
//   return rows
// }



