"use strict"

//Metodo de prueba
function pruebaUsers(req, res){

    res.status(200).send({mensaje:"Probando el controlado de usuarios"})

}

//Exportamos los métodos del módulo
module.exports = {
    pruebaUsers
}