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
    
    if(parametros.password){

        bcrypt.hash(parametros.password, null, null, function(err, hash){
            
            users.password = hash;
            
            if(parametros.user != null){

                (users).save((error, userSave)=>{

                    if(error){
            
                        res.status(500).send({mensaje: "Error al guardar el usuario"})
                    }else{
            
                        res.status(200).send({userSave})
                    }
                })
            }
        })

    }
}

//Metodo para el login de usuarios
function userLogin(req, res){

    var parametros = req.body;
    var user = parametros.user;
    var password = parametros.password;

    Users.findOne({user:user}, (error, selectUser)=>{

        if(error){

            res.status(500).send({mensaje: "Error al logear el usuario"})

        }else{

            if(!user){
                res.status(404).send({mensaje: "El usuario no existe en la base de datos"})
            }else{
                //res.status(200).send({selectUser});
                bcrypt.compare(password, selectUser.password, function(error, ok){
                    
                    if(ok){
                        res.status(200).send({selectUser});
                    }else{
                        res.status(404).send({mensaje: "El usuario no ha podido logear"})
                    }

                })
            }
        }
    })
}


//Exportamos los métodos del módulo
module.exports = {
    pruebaUsers,
    usersCreate,
    userLogin
}