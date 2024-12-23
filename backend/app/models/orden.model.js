//#NOTA: model no usado las consultas fueron independiente al model.js

module.exports = (sequelize, Sequelize) => {
    const Ordem = sequelize.define('orden', {
        idOrden:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        usuarios_idusuarios:{
            type: Sequelize.INTEGER
        },
        estados_idestados:{
            type: Sequelize.INTEGER
        },
        fecha_creacion:{
            type: Sequelize.DATETIME
        },
        nombre_completo:{
            type: Sequelize.STRING
        },
        direccion:{
            type: Sequelize.STRING
        },
        telefono:{
            type: Sequelize.STRING
        },
        correo_electronico:{
            type: Sequelize.STRING
        },
        fecha_entrega:{
            type: Sequelize.DATE
        },
        total_orden:{
            type: Sequelize.FLOAT
        }
    })
}