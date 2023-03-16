/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

/** load transaksi's controller */
const transaksiController = require(`../controllers/transaksi.controller.js`)
let authorization = require(`../middlewares/authorization`)
/** create route to add new transaksi book */
app.post("/add",[authorization.authorization], transaksiController.addTransaksi)
/** create route to update transaksi book based on ID */
app.put("/update/:id", [authorization.authorization],transaksiController.updateTransaksi)
/** create toute to delete transaksi book based on ID */
app.delete("/:id", [authorization.authorization],transaksiController.deleteTransaksi)
/** create route to return book */

/** create route to get all transaksi book */
app.get("/", [authorization.authorization],transaksiController.getTransaksi)
app.post("/date", [authorization.authorization],transaksiController.filterTransaksi)
app.post("/find", [authorization.authorization],transaksiController.findTransaksi)
app.put("/pay/:id_transaksi", [authorization.authorization],transaksiController.createPayment)
/** export app in order to load in another file */
module.exports = app
