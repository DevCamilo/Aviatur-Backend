// Se importa la librería de express
const express = require('express');
// Se importa la librería para validar el body de las  peticiones
const { celebrate, Joi } = require('celebrate');
// Se crea una variable para las rutas del servidor
const api = express.Router();
// Se importa el middleware de autenticación
const Auth = require('../middleware/Auth');

// Se importal el controllador del hotel
const HotelController = require('../controllers/HotelController');

// Se crea la ruta de la api para crear hoteles
api.post('/create-hotel', Auth.isAuth, celebrate({
    body: Joi.object().keys({ // Se validan los parametros del body
        name: Joi.string().required(),
        city: Joi.string().required(),
        address: Joi.string().required(),
        score: Joi.number().min(1).max(5).required(),
        price: Joi.number().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: "Faltan datos por enviar o son incorrectos" })
}, HotelController.createHotel);

// Se crea la ruta de la api para listar todos los registros
api.get('/list-all', Auth.isAuth, HotelController.listAllHotel);

// Se crea la ruta de la api para lista los registros por ID
api.get('/list-by-id/:id?', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: "Faltan datos por enviar o son incorrectos" })
}, HotelController.listById);

// Se crea la ruta de la api para actualizar los registros
api.put("/update/:id?", Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown(),
    body: Joi.object().keys({
        name: Joi.string().required(),
        city: Joi.string().required(),
        address: Joi.string().required(),
        score: Joi.number().min(1).max(5).required(),
        price: Joi.number().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: "Faltan datos por enviar o son incorrectos" })
}, HotelController.updateHotel);

// Se crea la ruta de la api para eliminar los registros por ID
api.get('/delete-by-id/:id?', Auth.isAuth, celebrate({
    query: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: "Faltan datos por enviar o son incorrectos" })
}, HotelController.deleteHotel);

module.exports = api;