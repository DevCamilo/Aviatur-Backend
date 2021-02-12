// Se importa la librería de express
const express = require('express');
// Se importa la librería para validar el body de las  peticiones
const { celebrate, Joi } = require('celebrate');
// Se crea una variable para las rutas del servidor
const api = express.Router();
// Se importa el middleware de autenticación
const Auth = require('../middleware/Auth');

// Se importal el controllador de los usuario
const UserController = require('../controllers/UserController');

// Se crea la ruta de la api para crear usuario
api.post('/create-user', Auth.isAuth, celebrate({
    body: Joi.object().keys({ // Se validan los parametros del body
        name: Joi.string().required(),
        lastName: Joi.string().required(),
        telephone: Joi.string().required(),
        email: Joi.string().email().required(),
        birthDate: Joi.string().isoDate().required(),
        password: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: "Faltan datos por enviar o son incorrectos" })
}, UserController.createUser);

// Se crea la ruta de la api para el login
api.get('/login', celebrate({
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: "Faltan datos por enviar o son incorrectos" })
}, UserController.login);

module.exports = api;