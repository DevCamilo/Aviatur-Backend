// Se importan las librerías necesarias para generar el token y manejar los tiempos
const jwt = require('jwt-simple');
const moment = require('moment');
// Se crea una variable con la llave de cifrado del token
const secret = '.084V14TUr!.-ño';

// Función que crea el token
function createToken(id) {
    const payload = {
        sub: id,  // Id del usuario ó inffo del usuario
        iat: moment().unix(), // Fecha de creación
        exp: moment().add(70, 'minutes').unix(), // Fecha de expiración del tocken
        secret: secret //Llave de cifrado
    }
    return jwt.encode(payload, secret, 'HS256'); //Hash de cifrado del token
}

// Función middleware que valida el toekn
function isAuth(req, res, next) {
    // Se valida que el toekn exista en las cabeceras de la petición
    if (!req.headers.authorization) {
        return res.status(401).send({ status: false, message: 'Se requiere autenticación' });
    }
    // Se valida que el toekn tenga la estructura correcta
    const token = req.headers.authorization.split(" ")[1];
    var segments = token.split('.');
    if (segments.length !== 3) {
        return res.status(401).send({ status: false, message: 'El token no es valido' });
    }
    // Se valida que el token sea legitimo
    const payload = jwt.decode(token, secret, true, 'HS256');
    if (payload.secret != secret){
        return res.status(401).send({ status: false, message: 'El token no es valido' });
    }
    // Se valida que el token no hay expirado
    if (payload.exp <= moment().unix()) {
        return res.status(401).send({ status: false, message: 'El token ha expirado' });
    }
    return next()
}

// se exportan las funciones de autenticación
module.exports = {
    createToken,
    isAuth
}
