//#NOTA: este archivo si se uso ya que para hacer constar el uso dependiente a modelo de parametros 
module.exports = (sequelize, Sequelize) => {
    const Estados = sequelize.define("estados", {
        idestados: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'ESTADOS'
    });

    return Estados;
};
