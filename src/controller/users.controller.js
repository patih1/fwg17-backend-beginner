// membuat data users
let users = [
  {
    id: 1,
    name: 'Bambang Sugeni'
  },{
    id: 2,
    name: 'Adam Suseno'
  }
]

// menghitung panjang data users
let countUser = users.length

// export function getAllUsers
exports.getAllUsers = (req, res) => {

  // memberikan response berupa data dalam bentuk json dengan message 'List all users' dan menampilkan data users
  return res.json({
    sucsess: true,
    message: 'List all users',
    result: users
  })
}

// export function detailUser
exports.detailUser = (req, res) => {
  // mendeklarasikan user sebagai penampung data users yang sudah di filter sesuai id nya
  const user = users.filter(item => item.id === Number(req.params.id))
  // guarding apabila data yang kembali itu kosong, maka di berukan error message dengan status 404, User not found
  if(!user[0]){
    return res.status(404).json({
      success: false,
      message: 'User not found'
    })
  }

  // memberikan response berupa data dalam bentuk json dengan message 'Detail user' 
  // dan menampilkan data users yang telah di filter dalam varuable user
  return res.json({
    success: true,
    message: 'Detail user',
    result: user[0]
  })
}

// export function createUsers
exports.createUsers = (req,res) => {

  // destructuring object name yang diambil dari data yang di input dalam body
  const {name} = req.body

  // increment panjang data user
  countUser++

  // mendefinisikan kedalam variable user, user.id = panjang users dan name = nama yang diambil dari iput dalam body
  const user = {
    id: countUser,
    name
  }

  // melakukan push data user kedalam data users
  users.push(user)

  // memberikan response berupa data dalam bentuk json dengan message 'Create user successfully' dan menampilkan data user
  return res.json({
    success: true,
    message: 'Create user successfully',
    result: user
  })

}

// export function updateUser
exports.updateUser = (req,res) => {
  // destructuring id dari params dan name dari body
  const {id} = req.params
  const {name} = req.body

  // mencari data dari users dengan id yang di passing melalui params berada pada index berapa
  const userId = users.map(user => user.id).indexOf(Number(id))
  // jika userId me return -1, maka program mereturn error 404, message User not found
  if(userId === -1){
    return res.status(404).json({
      success: false,
      message: 'User not found'
    })
  }

  // mengubah nama dalam data users menjadi nama yang di input melalui body
  users[userId].name = name

  // memberikan response berupa data dalam bentuk json dengan message 'Update successfully' 
  // dan menampilkan data users dengan index userId
  res.json({
    success: true,
    message: 'Update successfully',
    result: users[userId]
  })
}

// export function updateUser
exports.deleteUser = (req,res) => {
  // destructuring id dari params
  const {id} = req.params
  // mendefinisikan user = data dari users dengan id yang diambil melalui params
  const user = users.filter(user => user.id === Number(id))
  // guarding bila user tidak memiliki panjang maka error 404, message User not found
  if(!user.length){
    return res.status(404).json({
      success: false,
      message: 'User not found'
    })
  }

  // mendefinisikan ulang users menjadi data baru yang tidak menyertakan data yang ingin dihapus dengan id yang diambi dari params
  users = users.filter(user => user.id !== Number(id))
  
  // memberikan response berupa data dalam bentuk json dengan message 'Delete successfully' 
  // dan menampilkan data user dengan index 0
  return res.json({
    success: true,
    message: 'Delete successfully',
    result: user[0]
  })
}