// load library express
const express = require('express')

// initiate object that instance of express
const app = express()
let authorization = require(`../middlewares/authorization`)

// allow to read 'request with json type
app.use(express.json())

// load user's controller
const userController = require('../controllers/user.controller')
app.get("/", [authorization.authorization],userController.getAllUser)
app.get("/:id_user",[authorization.authorization], userController.getOneUser)
app.post("/add",[authorization.authorization], userController.addUser)
app.post("/find", [authorization.authorization],userController.searchUser)
app.put("/:id_user",[authorization.authorization], userController.updateUser)
app.delete("/:id_user",[authorization.authorization], userController.deleteUser)

app.post("/auth", userController.authentication)
// export app in order to load in another file
module.exports = app