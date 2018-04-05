"use strict";
//Require la dependencia Mongoose para acceder a la base de datos
var mongoose = require("mongoose");
//El objeto de tipo esquema nos permite guardar en una colección concreta y en un documento concreto dentro de esa colección
var schema = mongoose.Schema;

//Creamos el esquema con los respectivos atributos
var usersSchema = schema({
  user: String,
  password: String
});

//El objeto users va a poder ser instanciado y automáticanmente le vamos asignando los valores del esquema
module.exports = mongoose.model("users", usersSchema);
