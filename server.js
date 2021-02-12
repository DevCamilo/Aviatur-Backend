// Se importan las librerías de Express y para aceptar JSON en el request
const express = require('express');
const bodyParser = require('body-parser');
// Se importan las rutas
const HotelRoutes = require('./routes/HotelRouter');
const UserRoutes = require('./routes/UserRoutes');

// Se inicializa una nueva app de Express
const app = express();

// Se asigna el puerto de ejecucón del servidor
const port = process.env.PORT || 3000;

// Se parcea el body del request para aceptar content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Se parcea el body del request para aceptar content-type - application/json
app.use(bodyParser.json());

// Se define una ruta raíz
app.get('/', (req, res) => {
    res.send("Server Funcionando");
});

// Se usa las rutas selecionadas
app.use(HotelRoutes);
app.use(UserRoutes);

// Se inicia el servidor en el puerto configuurado
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});