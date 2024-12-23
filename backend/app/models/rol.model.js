//#NOTA: este archivo si se uso ya que para hacer constar el uso dependiente a modelo de parametros 

module.exports = (sequelize, Sequelize) => {
    const Rol = sequelize.define("rol", {
        idrol: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: Sequelize.STRING
        },       
    },
    {
        timestamps: false,
        tableName: 'ROL',
    }
);

    return Rol;
}
