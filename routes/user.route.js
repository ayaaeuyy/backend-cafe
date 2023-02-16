// load library express
const express = require('express')

// initiate object that instance of express
const app = express()

// allow to read 'request with json type
app.use(express.json())

// load user's controller
const userController = require('../controllers/user.controller')
app.get("/", userController.getAllUser)
app.get("/:id_user", userController.getOneUser)
app.post("/add", userController.addUser)
app.post("/find", userController.searchUser)
app.put("/:id_user", userController.updateUser)
app.delete("/:id_user", userController.deleteUser)

// export app in order to load in another file
module.exports = app