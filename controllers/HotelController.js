// Se importa el modelo del Hotel
const Hotel = require('../models/HotelModel');

// Controllador para crear nuevos hoteles
function createHotel(req, res) {
    const newHotel = new Hotel.newHotel(req.body);
    Hotel.create(req.body, (err, hotel) => {
        if (err) {
            res.status(500).send({ status: false, message: "Fallo al crear el Hotel" });
        } else {
            res.status(201).send({ status: true, message: `Hotel creado satisfactoriamente con id ${hotel}` });
        }
    });
}

// Controlador para listar todos los registros de la tabla
function listAllHotel(req, res) {
    Hotel.findAll((err, hotel) => {
        if (err) {
            res.status(500).send({ status: false, message: "Fallo al listar los Hoteles" });
        } else {
            res.status(200).send({ status: true, message: "Hoteles listados exitosamente", data: hotel });
        }
    });
}

// Contralador para listar los registros por ID
function listById(req, res) {
    Hotel.findById(req.query.id, (err, hotel) => {
        if (err) {
            res.status(500).send({ status: false, message: "Fallo al listar el Hotel" });
        } else {
            res.status(200).send({ status: true, message: "Hotel listado exitosamente", data: hotel });
        }
    });
}

// Controlador para actualizar los registros de los hoteles
function updateHotel(req, res) {
    const hotel = new Hotel.newHotel(req.body);
    Hotel.update(req.query.id, hotel, (err, hotel) => {
        if (err) {
            res.status(500).send({ status: false, message: "Fallo al actualizar el Hotel" });
        } else {
            res.status(200).send({ status: true, message: "Hotel actualizado exitosamente" });
        }
    });
}

// COntrolador para eliminar un registro de la db
function deleteHotel(req, res){
    Hotel.deleteHotel(req.query.id, (err, hotel) => {
        if (err) {
            res.status(500).send({ status: false, message: "Fallo al eliminar el Hotel" });
        } else {
            res.status(200).send({ status: true, message: "Hotel eliminado exitosamente" });
        }
    });
}

//Se exporta la lista de controlaadores
module.exports = {
    createHotel,
    listAllHotel,
    listById,
    updateHotel,
    deleteHotel
}
