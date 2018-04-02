"use strict"

//Metodo de prueba
function pruebaUsers(req, res){

    res.status(200).send({mensaje:"Probando el controlado de usuarios"})

}

//Importamos el modelo de usuarios
var Users = require("../models/users.models.js");

//Importamos la dependencia para encriptar contraseñas
var bcrypt = require("bcrypt-nodejs");

//Metodo creacion de usuarios
function usersCreate(req, res){

    //Creamos una variable que traiga el objeto del modelo Users
    var users = new Users();

    //Recogemos los parametros que llegan por la petición POST
    var parametros = req.body;
    //console.log(parametros);

    users.user = parametros.user;
    users.password = parametros.password;

    (users).save((error, userSave)=>{

        if(error){

            res.status(500).send({mensaje: "Error al guardar el usuario"})
        }else{

            res.status(200).send({userSave})
        }
    })

}

//Exportamos los métodos del módulo
module.exports = {
    pruebaUsers,
    usersCreate
}