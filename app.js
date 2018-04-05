"use strict";

var express = require("express");
var bodyParser = require("body-parser");

//La variable app es el objeto de express
//Esto sera el motor de la aplicación del backend porque va a recibir las peticiones hhttp, vamos a poder crear controladores, rutas, y las cosas fundamentales de un framework backend

var app = express();

//Esto convierte a objetos json los datos que nos llegan por las peticiones http y poder trabajar con ellos dentro del proyecto.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CARGAR RUTAS
var usersRoute = require("./routes/users.route.js");

//CABECERAS HTTP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//RUTAS BASE
//El metodo get() es una referencia de Express para poder habilitar la apalicación en el puerto establecido
//Se ponen dos parametros, el primero la ruta de la aplicación, el segundo una función con dos parámetros internos, un primer parámetro que es la solicitud "req", es decir lo que va a recibir de la petición y luego un segundo parámetro con la respuesta "res" que es lo que va a devolver
//app.get("/pruebas", function(req, res){

//Enviamos el estado de la respuesta, existen arios estados, los más comunes:
//200 OK
//404 Petición no encontrada
//500 Error interno del servidor

//   res.status(200).send({message: "Bienvenido"})

//})

app.use("/server", usersRoute);

//La accion module.exports es de Express.js para que el módulo pueda ser usado en otros archivos
module.exports = app;
