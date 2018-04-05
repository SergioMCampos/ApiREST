"use strict";
//Cargamos la dependencia de Express
var express = require("express");

//Cargamos el módulo del controlador
var usersController = require("../controllers/user.controller.js");

//Cargamos el Router de Express.js y con esto podemos crear rutas para nuestra ApiREST
var api = express.Router();

var md_aut = require("../token/authentication.js");

//Creamos la ruta con el método GET para pasar le metodo que va a tener que cargar la pagina cuando hagamos la peticion HTTP de esta ruta
api.get(
  "/probando-controlador-usuarios",
  md_aut.authentication,
  usersController.pruebaUsers
);

//Creamos la ruta para crear usuarios y utilizamos el método POST
api.post("/crear-usuarios", usersController.usersCreate);

//Creamos la ruta para el login de usuarios y utilizamos el método POST
api.post("/login", usersController.userLogin);

//Creamos la ruta para la autentificación del usuario
api.put(
  "/actulizar-usuario/:id",
  md_aut.authentication,
  usersController.updateUser
);

//Creamos la ruta para borrar al usuario
api.delete(
  "/borrar-usuario/:id",
  md_aut.authentication,
  usersController.deleteUser
);

//Exportamos el módulo api
module.exports = api;
