require('dotenv').config({
  path: './.env'
})

global.path = __dirname

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use('/uploads/products',express.static('upload/products'))
app.use('/uploads/users',express.static('upload/users'))

app.use(express.urlencoded({extended: true}))
var corsOptions = {
  origin: process.env.ALLOWED_ORIGIN
}
app.use(cors(corsOptions))

app.use('/', require('./src/routers'))

app.get('/', (req, res) => {
  return res.json ({
    success: true,
    message: `connection established`
  })
})

app.listen(process.env.PORT, ()=>{
  console.log(`App listening on port ${process.env.PORT}`)
})

module.exports = app