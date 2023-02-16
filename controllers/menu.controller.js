/** load model for table 'menu' */
const menuModel = require(`../models/index`).menu
/** load Operation from Sequelize */
const Op = require(`sequelize`).Op
/** load library 'path' and 'filestream' */
const path = require(`path`)
const fs = require(`fs`)

//import auth
const auth = require("../auth")
// app.use(auth)

/** create function to read all data */
exports.getAllMenu = async (request, response) => {
    /** call findAll() to get all data */
    try {
    let menu = await menuModel.findAll()
    return response.json({
        success: true,
        data: menu,
        message: `All Menus have been loaded`
    })
} catch (err) {
        console.log(err);
    }
}
exports.getOneMenu = async (request, response) => {
    try {
        let menu = await menuModel.findAll({
            where: {
                id_menu: request.params.id_menu
            }
        });
        response.json({
            success: true,
            data: menu,
            message: 'One menu has been loaded'
        })
    } catch (err) {
        console.log(err);
    }
}
/** create function for filter */
exports.findMenu = async (request, response) => {
    /** define keyword to find data */
    let keyword = request.body.keyword
    /** call findAll() within where clause and operation
    * to find data based on keyword */
    let menu = await menuModel.findAll({
        where: {
            [Op.or]: [
                { nama_menu: { [Op.substring]: keyword } },
                { jenis: { [Op.substring]: keyword } },
                { deskripsi: { [Op.substring]: keyword } },
            ]
        }
    })
    return response.json({
        success: true,
        data: menu,
        message: `All Menu have been loaded`
    })
}

/** load function from `upload-image`
* single(`image`) means just upload one file
* with request name `image`
*/
const upload = require(`./upload-image`).single(`image`)

/** create function to add new menu */

exports.addMenu = (request, response) => {
    /** run function upload */
    upload(request, response, async error => {
        /** check if there are errorwhen upload */
        if (error) {
            console.log(error)
            return response.json({ message: error })
        }
        /** check if file is empty */
        // if (!request.file) {
        //     return response.json({
        //         message: `Nothing to Upload`
        //     })
        // }
        /** prepare data from request */
        let newMenu = {
            nama_menu: request.body.nama_menu,
            jenis: request.body.jenis,
            deskripsi: request.body.deskripsi,
            image: request.file.filename,
            harga: request.body.harga
        }
        console.log(newMenu)
        /** execute inserting data to menu's table */
        menuModel.create(newMenu)
            .then(result => {
                /** if insert's process success */
                return response.json({
                    success: true,
                    data: result,
                    message: `New Menu has been inserted`
                })
            })
            .catch(error => {
                /** if insert's process failed */
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}

/** create function to update menu */
exports.updateMenu = async (request, response) => {
    /** run upload function */
    upload(request, response, async error => {
        /** check if there are error when upload */
        if (error) {
            return response.json({ message: error })
        }
        /** store selected menu ID that will update */
        let id = request.params.id
        /** prepare menu's data that will update */
        let menu = {
            nama_menu: request.body.nama_menu,
            jenis: request.body.jenis,
            deskripsi: request.body.deskripsi,
            harga: request.body.harga
        }
        /** check if file is not empty,
        * it means update data within reupload file
        */
        if (request.file) {
            /** get selected menu's data */
            const selectedMenu = await menuModel.findOne({
                where: { id: id_menu }
            })
            /** get old filename of image file */
            const oldImageMenu = selectedMenu.image
            /** prepare path of old image to delete file */
            const pathImage = path.join(__dirname, `../image`,
                oldImageMenu)
            /** check file existence */
            if (fs.existsSync(pathImage)) {
                /** delete old image file */
                fs.unlink(pathImage, error =>
                    console.log(error))
            }

            /** add new image filename to menu object */
            menu.image = request.file.filename
        }
        let idMenu = request.params.id_menu
        /** execute update data based on defined id menu */
        menuModel.update(menu, { where: { id_menu: idMenu } })
            .then(result => {
                /** if update's process success */
                return response.json({
                    success: true,
                    message: `Data menu has been updated`
                })
            })
            .catch(error => {
                /** if update's process fail */
                return response.json({
                })
            })
    })
}

/** create function to delete menu */
exports.deleteMenu = async (request, response) => {
    /** store selected menu's ID that will be delete */
    const id = request.params.id
    /** -- delete image file -- */
    /** get selected menu's data */
    const menu = await menuModel.findOne({ where: { id: id } })
    /** get old filename of image file */
    const oldImageMenu = menu.image
    /** prepare path of old image to delete file */
    const pathImage = path.join(__dirname, `../image`,
        oldImageMenu)
    /** check file existence */
    if (fs.existsSync(pathImage)) {
        /** delete old image file */
        fs.unlink(pathImage, error => console.log(error))
    }
    /** -- end of delete image file -- */

    /** execute delete data based on defined id menu */
    menuModel.destroy({ where: { id: id } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data menu has been deleted`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
    }
        // create function to delete data
exports.deleteMenu = (request, response) => {
    // define id user that will be update
    let idMenu = request.params.id_menu

    // execute delete data based on defined id user
    menuModel.destroy({ where: { id_menu: idMenu }})
    .then(result => {
        return response.json({
            success: true,
            message: 'Data menu has been updated'
        })
    })
    .catch(error => {
        // if update's process fail
        return response.json({
            success: false,
            message: error.message
        })
    })
}
// create function for filter
exports.searchMenu = async (request, response) => {
    // define keyword to find data
    let keyword = request.body.keyword

    // call findAll() within where clause and
    // operation to find data based on keyword
    let menu = await menuModel.findAll({
        where: {
            [Op.or]: [
                { nama_menu: { [Op.substring]: keyword }},
                { jenis: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: menu,
        message: 'Searching success'
    })
}



