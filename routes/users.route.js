"use strict"
//Cargamos la dependencia de Express
var express = require("express");

//Cargamos el módulo del controlador
var usersController = require("../controllers/user.controller.js");

//Cargamos el Router de Express.js y con esto podemos crear rutas para nuestra ApiREST
var api = express.Router();

//Creamos la ruta con el método GET para pasar le metodo que va a tener que cargar la pagina cuando hagamos la peticion HTTP de esta ruta
api.get("/probando-controlador-usuarios", usersController.pruebaUsers);

//Creamos la ruta para crear usuarios y utilizamos el método POST
api.post("/crear-usuarios", usersController.usersCreate);

//Exportamos el módulo api
module.exports = api;