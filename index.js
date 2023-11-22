// require = digunakan untuk menghubungkan sebuah file dengan file lainnya menggunakan path
// ketika jalur telah dihubungkan, data/program yang di export dari file sumber, dapat digunakan dalam file tujuan

require('dotenv').config({
  path: './.env'
})

// memanggil framework express dan disimpan dalam variable express agar dapat digunakan dalam program
const express = require('express')

const cors = require('cors')
const morgan = require('morgan')

// mendeklarasikan app sebagai fungsi express yang dipanggil
const app = express()

// app.use = fungsi middleware bersisi callback fungsi yang bersumber dari path spesifik. akan berjalan jika path sesuai dengan sumber fungsi

// fungsi untuk menguraikan request dengan urlencoded dalam body
app.use(express.urlencoded({extended: false}))

// menghubungkan file dengan file index router pada folder src/routers sekaligus menambahkan endpoint /
app.use('/', require('./src/routers'))

// mengambil data dalam bentuk json pada endpoint /
// program digunakan untuk memastikan bahwa url sudah sesuai
app.get('/', (req, res) => {
  return res.json ({
    success: true,
    message: `connection established`
  })
})

// menjalankan program pada port 5050
app.listen(process.env.PORT, ()=>{
  console.log(`App listening on port ${process.env.PORT}`)
})