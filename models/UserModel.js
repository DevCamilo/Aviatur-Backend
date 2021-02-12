// Se importa los parametros de conexión de la base de datos
var dbConn = require('../config/db');

// Se crea una función para instanciar un nuevo usuario
function newUser(user) {
    this.name = user.name;
    this.lastName = user.lastName;
    this.telephone = user.telephone;
    this.email = user.email;
    this.birthDate = user.birthDate;
    this.password = user.password;
}

// Se crea la función para insertar nuevos registros en la db
function create(newUser, result) {
    // Se valida que el correo no exissta dentro de la db
    dbConn.query("SELECT * FROM user WHERE email = ?", newUser.email, (errSelect, resSelect) => {
        if (errSelect) {
            console.log("error: ", err);
            result(err, null);
        } else {
            // Si el correo ya existe se envía el mensaje de error
            if (resSelect.length > 0) {
                result("El correo ya existe", null);
            } else {
                // Si el correo no existe se crea el usuario
                dbConn.query("INSERT INTO user set ?", newUser, (errInsert, resInsert) => {
                    if (errInsert) {
                        console.log("error: ", errInsert);
                        result(errInsert, null);
                    } else {
                        result(null, resInsert.insertId);
                    }
                });
            }
        }
    });
}

// función para hacer login de un usuario
function login(user, result) {
    // Se valida el correo y contraseña existan
    dbConn.query("SELECT * FROM user WHERE email = ? AND password = ?", [user.email, user.password], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            // Se valida que el usuario exista y sea correcto
            if (res.length > 0) {
                // Si el usuario existe se retorna
                result(null, res);
            } else {
                result("El correo o contraseña son incorrectas", null);
            }
        }
    })
}

module.exports = {
    newUser,
    create,
    login
}