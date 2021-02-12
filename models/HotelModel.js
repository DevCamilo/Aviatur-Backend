// Se importa los parametros de conexión de la base de datos
var dbConn = require('../config/db');

// Se crea una función para instanciar un nuevo hotel
function newHotel(hotel){
    this.name = hotel.name;
    this.city = hotel.city;
    this.address = hotel.address;
    this.score = hotel.score;
    this.price = hotel.price;
}

// Se crea la función para insertar nuevos registros en la db
function create(newHotel, result) {
    dbConn.query("INSERT INTO hotel set ?", newHotel, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
}

// Se exportan todas las funciones del modelo
module.exports = {
    newHotel,
    create
}