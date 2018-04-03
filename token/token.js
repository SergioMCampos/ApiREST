"use strict"

//Requerimos la dependencia jwt-simple para crear el token
var token = require("jwt-simple");

//Moment: Esta dependencia nos permite hacer registro de fecha de creación del token y la fecha de expiración de este token
var momento = require("moment");

//Con esta clave podemos descodificar el token
var secretKey = "secret_key";

//METODO DEL TOKEN
exports.tokenCreate = function(user){

    //datos que vamos a codificar 
    var loadToken = {
        //Usamos esto para guardar el id del objeto
        sub: user._id,
        name: user.user,
        //unix() formato timestamp actual
        now: momento().unix(),
        exp: momento().add(30, "days").unix()

    }
    //Devolvemos el token codificado
    return token.encode(loadToken, secretKey);
}