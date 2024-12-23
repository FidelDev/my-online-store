//#NOTA: model no usado las consultas fueron independiente al model.js
module.exports = (sequelize, Sequelize) => {
    const CategoriaProductos = sequelize.define('categoriaproductos', {
        idCategoriaProductos: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        usuarios_idusuarios: {
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING
        },
        estados_idestados: {
            type: Sequelize.INTEGER
        },
        fecha_creacion: {
            type: Sequelize.DATETIME
        }
    })
}
