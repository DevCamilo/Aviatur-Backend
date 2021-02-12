// Se importa el modelo del Usuario
const User = require('../models/UserModel');
// Se importa el token
const Token = require('../middleware/Auth');


// Controllador para crear nuevos usuario
function createUser(req, res) {
    const newUser = new User.newUser(req.body);
    User.create(newUser, (err, newUser) => {
        if (err) {
            res.status(500).send({ status: false, message: "Fallo al crear el Usuario", reason: err });
        } else {
            res.status(201).send({ status: true, message: `Usuario creado satisfactoriamente con id ${newUser}` });
        }
    });
}

// Controlador para login de usuarios
function login(req, res){
    User.login(req.body, (err, user) => {
        if(err) {
            res.status(401).send({ status: false, message: "Fallo al iniciar sesión", reason: err })
        } else {
            res.status(200).send({ status: true, message: `Bienvenido ${user[0].name}`, data: user, token: Token.createToken(user.id)})
        }
    })
}

module.exports = {
    createUser,
    login
}