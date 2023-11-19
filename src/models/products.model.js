const db = require('../lib/db.lib')

exports.findAll = async ()=>{
  const sql = `SELECT * FROM "product"`
  const values = []
  const {rows} = await db.query(sql,values)
  return rows
}

exports.findOne = async (id)=>{
  const sql = `SELECT * FROM "product" WHERE "id" = $1`
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.insert = async (data)=>{
  const sql = `
  INSERT INTO "product" 
  ("name", "description", "basePrice", "isRecommended")
  VALUES
  ($1,$2,$3,$4)
  RETURNING *
  `

  let values = []
  if(data.isRecommended){
    values = [data.name,data.description,data.basePrice,true]
  }else if(!data.isRecommended){
    values = [data.name,data.description,data.basePrice,false]
  }
  
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.update = async (id, data)=>{

  const sql = `UPDATE "product" set "name" = $2 WHERE "id" = $1`
  const values = [id, data.value]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.delete = async (id)=>{
  const sql = `DELETE FROM "product" WHERE "id" = $1`
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows[0]
}