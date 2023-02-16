// load model for user table
const userModel = require('../models/index').users

// load operation from Sequelize
const Op = require('sequelize').Op

//import auth
const auth = require("../auth")
// app.use(auth)

// TODO export sekali aja
// create function for read all data
exports.getAllUser = async (request, response) => {
    // call findAll() to get all data
    try {
        let users = await userModel.findAll();
        response.json({
            success: true,
            data: users,
            message: 'All users have been loaded'
        })
    } catch (err) {
        console.log(err);
    }
}

exports.getOneUser = async (request, response) => {
    try {
        let users = await userModel.findAll({
            where: {
                id_user: request.params.id_user
            }
        });
        response.json({
            success: true,
            data: users,
            message: 'One user has been loaded'
        })
    } catch (err) {
        console.log(err);
    }
}

// create function for filter
exports.searchUser = async (request, response) => {
    // define keyword to find data
    let keyword = request.body.keyword

    // call findAll() within where clause and
    // operation to find data based on keyword
    let users = await userModel.findAll({
        where: {
            [Op.or]: [
                { username: { [Op.substring]: keyword }},
                { role: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: users,
        message: 'Searching success'
    })
}

// create function for add new user
exports.addUser = (request, response) => {
    // prepare data from request
    let newUser = {
        nama_user: request.body.nama_user,
        role: request.body.role,
        username: request.body.username,
        password: request.body.password
    }

    // execute inserting data to user's table
    userModel.create(newUser)
        .then(result => {
            // if inser's process success
            return response.json({
                success: true,
                data: result,
                message: 'New user has been inserted'
            })
        })
        .catch(error => {
            // if insert's process fail
            return response.json({
                success: false,
                message: error.message
            })
        })
}

// create function for update member
exports.updateUser = (request, response) => {
    // prepare data that has been changed
    let dataUser = {
        nama_user: request.body.nama_user,
        role: request.body.role,
        username: request.body.username,
        password: request.body.password
    }

    // define id user that will be update
    let idUser = request.params.id_user

    // execute update data based on defined id member
    userModel.update(dataUser, {where: {id_user: idUser} })
    .then(result => {
        // if update's process success
        return response.json({
            success: true,
            data:dataUser,
            message: 'Data user has been updated'
        })
    })
    .catch(error =>{
        // if update's process fail
        return response.json({
            success: false,
            message: error.message
        })
    })
}

// create function to delete data
exports.deleteUser = (request, response) => {
    // define id user that will be update
    let idUser = request.params.id_user

    // execute delete data based on defined id user
    userModel.destroy({ where: { id_user: idUser }})
    .then(result => {
        return response.json({
            success: true,
            message: 'Data user has been updated'
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