//NOTA: no use el model.js ya que relice las consultas directa al sequelize.query de manera independiente al model.js
module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define('usuarios', {
        idusuarios: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rol_idrol: {
            type: Sequelize.INTEGER
        },
        estados_idestados: {
            type: Sequelize.INTEGER
        },
        correo_electronico: {
            type: Sequelize.STRING
        },
        nombre_completo: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING
        },
        fecha_nacimiento: {
            type: Sequelize.DATE
        },
        fecha_creacion: {
            type: Sequelize.DATETIME
        },
        clientes_idClientes: {
            type: Sequelize.INTEGER
        }
    });

    return Usuarios;
}