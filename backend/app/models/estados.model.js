//mapeando los campos que contiene nuestra base de datos 
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

/*
ESTADOS
idestados int autoIncrement,
nombre string
*/