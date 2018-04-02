/*
 * @Author: nutepas 
 * @Date: 2018-03-31 00:51:09 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-03-31 12:01:49
 */
"use strict"

//Libreria MongoDB
//Utilizamos mongoose como librería para intermediar con la base de datos de mongoDB
//Cargamos la librería utilizando la funcion require()
var mongoose = require("mongoose");


//Modulo express
var app = require("./app");
//Esto es para establecer la variable de entorno PORT (puerto HTTP)
var port = process.env.PORT || 1234;

//Conexión a base datos
mongoose.connect("mongodb://localhost:27017/mongo", (error, answer) => {

    if(error){
        throw error;
    }else{
        console.log("La conexion a la base de datos es correcta");

        //El método listen() es una referencia de Express.js para traer dos parámetros, el puerto y la acción con el puerto
        app.listen(port, function(){
            console.log("Servidor del ApiREST en http://localhost"+port);
        })
    }
})