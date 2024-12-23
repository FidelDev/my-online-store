//Este controlador manejará el inicio de sesión y la generación de tokens JWT.
const db = require("../configs/db.config.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signIn = async (req, res) => {
    const { correo_electronico, password } = req.body;

    // Verificando que correo_electronico y password estén presentes
    if (!correo_electronico || !password) {
        return res.status(400).send({ message: "Se requieren el correo electrónico y la contraseña." });
    }

    const user = await db.sequelize.query(
        "SELECT idusuarios, correo_electronico, password FROM usuarios WHERE correo_electronico = :correo_electronico", // Asegúrate de que estás seleccionando la columna 'password'
        {
            replacements: { correo_electronico },
            type: db.sequelize.QueryTypes.SELECT
        }
    );

    // Verifica si se obtuvo algún usuario
    if (!user || user.length === 0) {
        return res.status(404).send({ message: "Usuario no encontrado." });
    }

    // Accediendo al primer elemento del array resultante
    const userData = user[0];

    var passwordIsValid = bcrypt.compareSync(password, userData.password);

    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Contraseña incorrecta!"
        });
    }

    var token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
    });

    res.status(200).send({
        id: userData.id,
        correo_electronico: userData.correo_electronico,
        accessToken: token
    });
};
