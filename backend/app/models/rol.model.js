//parametros correctos para las tablas de la base de datos
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

/*
--table ROL
idrol
nombre
*/