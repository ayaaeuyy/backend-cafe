const app = require("../routes/transaksi.route")
const moment = require("moment")
/** load model for `transaksi` table */
const transaksiModel = require(`../models/index`).transaksi
/** load model for `details_transaksi` table */
const detailTransaksiModel =
    require(`../models/index`).detail_transaksi
/** load Operator from Sequelize */
const Op = require(`sequelize`).Op

/** create function for add transaksi */
exports.addTransaksi = async (request, response) => {
    /** prepare data for transaksi table */
    let newData = {
        tgl_transaksi: moment().format("YYYY-MM-DD"),
        id_user: request.body.id_user,
        id_meja: request.body.id_meja,
        nama_pelanggan: request.body.nama_pelanggan,
        status: request.body.status
    }

    /** execute for inserting to transaksi's table */
    transaksiModel.create(newData)
        .then(result => {
            /** get the latest id of book transaksi*/
            let idTransaksi = result.id_transaksi
            /** store details of book transaksi from request
            * (type: array object)
            */
            let detailTransaksi = request.body.detail_transaksi
            /** insert diTransaksi to each item of detailTransaksi
            */
            for (let i = 0; i < detailTransaksi.length; i++) {
                detailTransaksi[i].id_transaksi = idTransaksi
            }
            /** insert all data of detailTransaksi */
            detailTransaksiModel.bulkCreate(detailTransaksi)
                .then(result => {
                    return response.json({
                        success: true,
                        message: `New Transaction has been
inserted`
                    })
                })
                .catch(error => {
                    return response.json({
                        success: false,
                        message: error.message
                    })
                })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/** create function for update transaksi */
exports.updateTransaksi = async (request, response) => {
    /** prepare data for transaksi's table */
    let newData = {
        tgl_transaksi: moment().format("YYYY-MM-DD"),
        id_user: request.body.id_user,
        id_meja: request.body.id_meja,
        nama_pelanggan: request.body.nama_pelanggan,
        status: request.body.status
    }
    /** prepare parameter transaksi ID */
    let idTransaksi = request.params.id
    /** execute for inserting to transaksi's table */
    transaksiModel.update(newData, { where: { id_transaksi: idTransaksi } })
        .then(async result => {
            /** delete all detailTransaksi based on idTransaksi */
            await detailTransaksiModel.destroy(
                { where: { id_transaksi: idTransaksi } }
            )
            /** store details of transaksi from request
            * (type: array object)
            */
            let detailTransaksi = request.body.detail_transaksi
            /** insert idTransaksi to each item of detailTransaksi
            */
            for (let i = 0; i < detailTransaksi.length; i++) {
                detailTransaksi[i].id_transaksi = idTransaksi
            }
            /** re-insert all data of detailTransaksi */
            detailTransaksiModel.bulkCreate(detailTransaksi)
                .then(result => {
                    return response.json({
                        success: true,
                        message: `Transaction has been
    updated`
                    })
                })
                .catch(error => {
                    return response.json({
                        success: false,
                        message: error.message
                    })
                })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/** create function for delete transaksi's data */
exports.deleteTransaksi = async (request, response) => {
    /** prepare idTransaksi that as paramter to delete */
    let idTransaksi = request.params.id
    /** delete detailTransaksi using model */
    detailTransaksiModel.destroy(
        { where: { id_transaksi: idTransaksi } }
    )
        .then(result => {
            /** delete transaksis data using model */
            transaksiModel.destroy({ where: { id_transaksi: idTransaksi } })
                .then(result => {
                    return response.json({
                        success: true,
                        message: `Transaksi's has deleted`
                    })
                })
                .catch(error => {
                    return response.json({
                        success: false,
                        message: error.message
                    })
                })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/** create function for return transaksi */
exports.returnMenu = async (request, response) => {
    /** prepare idTransaksi that will be return */
    let idTransaksi = request.params.id
    /** prepare current time for return's time */
    let today = new Date()
    let currentDate = `${today.getFullYear()}-${today.getMonth()
        + 1}-${today.getDate()}`
    /** update status and date_of_return from transaksi's data */
    transaksiModel.update(
        {
            date_of_return: currentDate,
            status: true
        },
        {
            where: { id_transaksi: idTransaksi }
        }
    )
        .then(result => {
            return response.json({
                success: true,
                message: `Transaksi has been returned`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/** create function for get all transaksi data */
exports.getTransaksi = async (request, response) => {
    let data = await transaksiModel.findAll(
        {
            include: [
                `users`, `meja`,
                {
                    model: detailTransaksiModel,
                    as: `detail_transaksi`,
                    include: ["menu"]
                }
            ]
        }
    )
    return response.json({
        success: true,
        data: data,
        message: `All transaction book have been loaded`
    })
}
