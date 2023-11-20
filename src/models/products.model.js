const db = require('../lib/db.lib')

exports.findAll = async ()=>{
  const sql = `SELECT * FROM "products"`
  const values = []
  const {rows} = await db.query(sql,values)
  return rows
}

exports.findOne = async (id)=>{
  const sql = `SELECT * FROM "products" WHERE "id" = $1`
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.insert = async (data)=>{
  const sql = `
  INSERT INTO "products" 
  ("name", "description", "basePrice", "isRecommended")
  VALUES
  ($1,$2,$3,$4)
  RETURNING *
  `

  let values = []
  if(data.isRecommended === 'true'){
    values = [data.name,data.description,data.basePrice,true]
  }else if(!data.isRecommended){
    values = [data.name,data.description,data.basePrice,false]
  }
  
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
    if(testnumber(data[i]) === false){
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