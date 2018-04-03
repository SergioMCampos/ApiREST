"use strict"

//Metodo de prueba
function pruebaUsers(req, res){

    res.status(200).send({mensaje:"Probando el controlado de usuarios"})

}

//Importamos el modelo de usuarios
var Users = require("../models/users.models.js");

//Importamos la dependencia para encriptar contraseñas
var bcrypt = require("bcrypt-nodejs");

//Importamos el token
var token = require("../token/token.js");

//METODO CREACION DE USUARIO
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

//METODO PARA LOGIN DE USUARIO
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
                        //res.status(200).send({selectUser});

                        //Se deberia enviar un parámetro token true
                        if(parametros.token){
                            //Devolvemos un token de JWT
                            res.status(200).send({token: token.tokenCreate(selectUser)})
                        }
                    }else{
                        res.status(404).send({mensaje: "El usuario no ha podido logear"})
                    }

                })
            }
        }
    })
}

//METODO PARA ACTUALIZAR USUARIO
function updateUser(req, res){

    //Llamamos por parametro al id que queremos actualizar
    var id = req.params.id;
    //Con esto cogemos los datos del formulario
    var update = req.body;

    if(id != req.userToken.sub){
        return res.status(500).send({mensaje: "No tienes permisos para actualizar este usuario"})
    }

    //Recorremos la base datos con el método findByIdAndUpdate

    Users.findByIdAndUpdate(id, update, (error, userUpdate) =>{

        if(error){
            res.status(500).send({mensaje: "Error al actualizar el usuario"})
        }else{

            if(!userUpdate){
                res.status(404).send({mensaje: "No se ha podido actualizar el usuario"})
            }else{
                res.status(200).send({userUpdate})
            }
        }
    })
}

//METODO PARA BORRAR USUARIO
function deleteUser(req, res){

    var id = req.params.id;

    if(id != req.userToken.sub){
        return res.status(500).send({mensaje: "No tienes permisos para actualizar este usuario"})
    }


    //Recorremos la base datos con el método findByIdAndRemove
    Users.findByIdAndRemove(id, (error, userDelete)=>{

        if(error){
            return res.status(500).send({mensaje: "Error al borrar el usuario"})
        }else{
            if(!userDelete){
                res.status(404).send({mensaje: "No se ha podido borrar el usuario"})
            }else{
                res.status(200).send({userDelete})
            }
        }

    })

}


//Exportamos los métodos del módulo
module.exports = {
    pruebaUsers,
    usersCreate,
    userLogin,
    updateUser,
    deleteUser
}