exports.getAllUsers = (req, res) => {
  return res.json({
    sucsess: true,
    message: 'List all users',
    result: [
      {
        id: 1,
        name: 'Bambang Sugeni'
      },{
        id: 2,
        name: 'Adam Suseno'
      }
    ]
  })
}

exports.getUser = (req, res) => {
  const {id} = req.params

  const x = Number(id)

  
  const result = [{
    id: 1,
    name: 'Bambang Sugeni'
  },{
    id: 2,
    name: 'Adam Suseno'
  }]
  const getIndex = (index, arr) => {
    return arr[index]
  }

  return res.json({
    sucsess: true,
    message: `id = ${id}`,
    result: getIndex(x - 1, result)
  })
}

exports.createUsers = (req,res) => {

  return res.json({
    success: true,
    result: [{
      id: 1,
      name: 'Bambang Sugeni'
    },{
      id: 2,
      name: 'Adam Suseno'
    },req.body]
  })
}

exports.deleteUsers = (req,res) => {

  const {id} = req.body

  const i = Number(id)

  const arr = [
    {
      id: 1,
      name: 'Bambang Sugeni'
    },{
      id: 2,
      name: 'Adam Suseno'
    },{
      id: 3,
      name: 'Spongebob Squarepants'
    }
  ]

  arr.splice(i - 1, 1)

  return res.json({
    success: true,
    result: arr
  })
}

exports.updateUsers = (req,res) => {

  const {id,name} = req.body
  const i = Number(id)

  const result = [
    {
      id: 1,
      name: 'Bambang Sugeni'
    },{
      id: 2,
      name: 'Adam Suseno'
    }
  ]

  const update = (arr, i, newname) => {
    return {...arr[i-1], name: newname}
  }

  result[i - 1] = update(result, id, name)

  return res.json({
    success: true,
    message: 'hello',
    result: result
  })
}