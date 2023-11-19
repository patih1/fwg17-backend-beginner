const db = require('../lib/db.lib')

exports.findAll = async ()=>{
  const sql = `SELECT * FROM "productVariant"`
  const values = []
  const {rows} = await db.query(sql,values)
  return rows
}

exports.findOne = async (id)=>{
  const sql = `SELECT * FROM "productVariant" WHERE "id" = $1`
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.insert = async (data)=>{
  const sql = `
  INSERT INTO "productVariant" 
  ("name", "additionalPrice")
  VALUES
  ($1, $2)
  RETURNING *
  `
  const values = [data.name,Number(data.additionalPrice)]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.update = async (id, data)=>{

  const sql = `UPDATE "productVariant" set "name" = $2 WHERE "id" = $1`
  const values = [id, data.value]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.delete = async (id)=>{
  const sql = `DELETE FROM "productVariant" WHERE "id" = $1`
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows[0]
}