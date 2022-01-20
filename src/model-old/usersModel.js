const fs = require("fs")
const path = require("path")
const bcrypt = require("bcryptjs")
const { usersDB } = require("../data")

//* Crea un nuevo ID
const newID = () => {
  let id = 0
  usersDB.forEach(p => p.id > id ? id = p.id : "")
  return id + 1
}

class User {
  constructor({img, name, surname, category, email, password}) {
    this.id = newID()
    this.img = img ?? "default.png"
    this.name = name
    this.surname = surname
    this.category = category
    this.email = email
    this.password = bcrypt.hashSync(password, 10)
  }

  edit({img, name, surname, category, email, password} = this) {
    this.img = img ?? "default.png"
    this.name = name
    this.surname = surname
    this.category = category
    this.email = email
    this.password = bcrypt.hashSync(password, 10)
  }
}

//* Escribe los datos actualizados en el archivo .json
const writeUsers = () => {
  let dbJSON = JSON.stringify(usersDB, null, 4)
  let dbPath = path.resolve(__dirname, "../data/usersDB.json")
  fs.writeFileSync(dbPath, dbJSON)
}

const model = {
  //* Obtener un usuario mediante un ID
  getUser: function (id) {
    return usersDB.find(item => item.id === id) || null
  },

  //* Añadir un nuevo usuario
  addUser: function (user, fileName) {
    let newUser = new User({...user, img: fileName})
    usersDB.push(newUser)
    writeUsers()
  },

  //* Editar la información de un usuario
  editUser: function (id, user, fileName) {
    if (!this.getUser(id))
      return console.error("Este usuario no existe!!", id)

    let currentItem = this.getUser(id)

    if (fileName) {
      let imgPath = path.resolve(__dirname, "../public/img/products", currentItem.img)
      fs.rmSync(imgPath)
    }

    currentItem.edit({...user, img: fileName})

    let index = usersDB.indexOf(currentItem)
    usersDB[index] = currentItem

    writeUsers()
  },

  //* Borrar un usuario
  deleteUser: function (id) {
    let userToDelete = this.getUser(id)
    if (!userToDelete)
      return console.error("Este usuario no existe!! id: ", id)

    let indexToDelete = usersDB.indexOf(userToDelete)
    usersDB.splice(indexToDelete, 1)

    writeUsers()
  },
}

module.exports = model

// console.log(model.getUser(0))
// console.log(model.getUser(1))
// console.log(model.getUser(3))
// console.log(model.getUser(5))
// console.log(model.getUser(7))