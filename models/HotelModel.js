// Se importa los parametros de conexión de la base de datos
var dbConn = require('../config/db');

// Se crea una función para instanciar un nuevo hotel
function newHotel(hotel) {
    this.name = hotel.name;
    this.city = hotel.city;
    this.address = hotel.address;
    this.score = hotel.score;
    this.price = hotel.price;
}

// Se crea la función para insertar nuevos registros en la db
function create(newHotel, result) {
    dbConn.query("INSERT INTO hotel set ?", newHotel, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
}

// Se crea la función para traer todos los registros de la db
function findAll(result) {
    dbConn.query("SELECT * FROM hotel WHERE status = 1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

// Se crea la función para traer los registros por ID de la db
function findById(id, result) {
    dbConn.query("SELECT * FROM hotel WHERE status = 1 AND id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

// Se crea la función para actualizar los registros de la db
function update(id, hotel, result) {
    dbConn.query("UPDATE hotel SET name = ?, city = ?, address = ?, score = ?, price = ? WHERE id = ?",
        [hotel.name, hotel.city, hotel.address, hotel.score, hotel.price, id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
}

// Se crea la función para eliminar un registro de la db
function deleteHotel(id, result) {
    dbConn.query("UPDATE hotel SET status = 0 WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

// Se exportan todas las funciones del modelo
module.exports = {
    newHotel,
    create,
    findAll,
    findById,
    update,
    deleteHotel
}