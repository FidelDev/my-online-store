//#NOTA: model no usado las consultas fueron independiente al model.js
module.exports = (sequelize, Sequelize) => {
    const OrdenDetalles = sequelize.define('ordendetalles', {
        idOrdenDetalles:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Orden_idOrden:{
            type: Sequelize.INTEGER
        },
        Productos_idProductos:{
            type: Sequelize.INTEGER
        },
        cantidad:{
            type: Sequelize.INTEGER
        },
        precio:{
            type: Sequelize.FLOAT
        },
        subtotal:{
            type: Sequelize.FLOAT
        }
    })
}
