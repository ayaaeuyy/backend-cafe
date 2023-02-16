/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

/** load transaksi's controller */
const transaksiController =
require(`../controllers/transaksi.controller.js`)

/** create route to add new transaksi book */
app.post("/", transaksiController.addTransaksi)
/** create route to update transaksi book based on ID */
app.put("/update/:id", transaksiController.updateTransaksi)
/** create toute to delete transaksi book based on ID */
app.delete("/:id", transaksiController.deleteTransaksi)
/** create route to return book */
app.get("/return/:id", transaksiController.returnMenu)
/** create route to get all transaksi book */
app.get("/", transaksiController.getTransaksi)
/** export app in order to load in another file */
module.exports = app
