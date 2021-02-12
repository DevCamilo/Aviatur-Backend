// Se importa la librería de express
const express = require('express');
// Se importa la librería para validar el body de las  peticiones
const { celebrate, Joi } = require('celebrate');
// Se crea una variable para las rutas del servidor
const api = express.Router();

// Se importal el controllador del hotel
const HotelController = require('../controllers/HotelController');

api.post('/create-hotel', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        city: Joi.string().required(),
        address: Joi.string().required(),
        score: Joi.number().min(1).max(5).required(),
        price: Joi.number().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: "Faltan datos por enviar o son incorrectos" })
}, HotelController.createHotel);

module.exports = api;