const db = require('../lib/db.lib')

exports.findAll = async ()=>{
  const sql = `SELECT * FROM "productTags"`
  const values = []
  const {rows} = await db.query(sql,values)
  return rows
}

exports.findOne = async (id)=>{
  const sql = `SELECT * FROM "productTags" WHERE "id" = $1`
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.insert = async (data)=>{
  const sql = `
  INSERT INTO "productTags" 
  ("name")
  VALUES
  ($1)
  RETURNING *
  `
  const values = [data.name]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.update = async (id, data)=>{

  const sql = `UPDATE "productTags" set "name" = $2 WHERE "id" = $1`
  const values = [id, data.value]
  const {rows} = await db.query(sql,values)
  return rows[0]
}

exports.delete = async (id)=>{
  const sql = `DELETE FROM "productTags" WHERE "id" = $1`
  const values = [id]
  const {rows} = await db.query(sql,values)
  return rows[0]
}