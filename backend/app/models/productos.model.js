//#NOTA: model no usado las consultas fueron independiente al model.js
module.exports = (sequelize, Sequelize) => {
    const Productos = sequelize.define('productos', {
        idProductos: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        CategoriaProductos_idCategoriaProductos: {
            type: Sequelize.INTEGER
        },
        usuarios_idusuarios: {
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING
        },
        marca: {
            type: Sequelize.STRING
        },
        código: {
            type: Sequelize.STRING
        },
        stock: {
            type: Sequelize.FLOAT
        },
        estados_idestados: {
            type: Sequelize.INTEGER
        },
        precio: {
            type: Sequelize.FLOAT
        },
        fecha_creacion: {
            type: Sequelize.DATETIME
        },
        foto: {
            type: Sequelize.BINARY
        }
    })
}

