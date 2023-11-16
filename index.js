const express = require('express')
// const { getAllUsers } = require('./src/controllers/users.controller')

const app = express()

app.use(express.urlencoded({extended: false}))

app.use('/', require('./src/routers'))

app.get('/', (req, res) => {
  return res.json ({
    success: true,
    message: `asdadasd`
  })
})

app.listen(5050, ()=>{
  console.log('App listening on port 5050')
})