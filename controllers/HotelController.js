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

//Se exporta la lista de controlaadores
module.exports = {
    createHotel
}
