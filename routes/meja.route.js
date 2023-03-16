// load library express
const express = require('express')

// initiate object that instance of express
const app = express()
let authorization = require(`../middlewares/authorization`)
// allow to read 'request with json type
app.use(express.json())

// load meja's controller
const mejaController = require('../controllers/meja.controller')
app.get("/", mejaController.getAllMeja)
app.get("/:id_meja",[authorization.authorization], mejaController.getOneMeja)
app.post("/add", [authorization.authorization],mejaController.addMeja)
app.post("/find", [authorization.authorization],mejaController.searchMeja)
app.put("/:id_meja",[authorization.authorization], mejaController.updateMeja)
app.delete("/:id_meja",[authorization.authorization], mejaController.deleteMeja)

// export app in order to load in another file
module.exports = app