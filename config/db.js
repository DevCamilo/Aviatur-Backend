// Se importa la librería de MySQL
const mysql = require('mysql');

// Se crean los una conexón local
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aviatur'
});

// Se establece la conexión
dbConn.connect(function (err) {
    if (err) throw err;
    console.log("Base de datos conectada");
});

// Se exporta la conexión establecida de la base de datos
module.exports = dbConn;