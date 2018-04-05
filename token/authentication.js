"use strict";

var token = require("jwt-simple");
var momento = require("moment");
var secretKey = "secret_key";

//METODO DE AUTENTIFICACIÓN

//Creación middleware (logica de intercambio)
exports.authentication = function(req, res, next) {
  //Pasamos el token por una cabecera de autentificación

  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ mensaje: "La petición no tiene la cabecera de autentificación" });
  } else {
    //Quitamos las comillas simples y dobles al token con el metodo replace
    var tokenSend = req.headers.authorization.replace(/['"]+/g, "");

    //Manejo de excepciones
    //La sentencia try...catch marca un bloque de instrucciones a intentar que pueda causar alguna excepción, y declarar una o más respuestas ne caso de que una excepcion sea lanzada. Si una excepción se lanza, la sentencia try...catch se encarga de atraparla.
    //Bloque try para probar sentencias

    try {
      var loadToken = token.decode(tokenSend, secretKey);

      //Compararmos la fecha actual con la expiración del token
      if (loadToken.exp <= momento().unix()) {
        return res.status(403).send({ mensaje: "El token ha expirado" });
      }
      //En el bloque catch se usa para capturar las excepciones que se generan en el bloque try
    } catch (excepcion) {
      console.log(excepcion);
      return res.status(403).send({ mensaje: "El token no es válido " });
    }
    //Añadimos al objeto Request una propiedad de usuario para siempre tener disponbile el token en cualquier sesión. Con esto no hace falta estar decodificando el token en cada sesión en la que se logue el usuario
    req.userToken = loadToken;
    next();
  }
};
