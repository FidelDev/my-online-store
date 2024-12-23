module.exports = (sequelize, Sequelize) => {
    const clientes = sequelize.define('clientes', {
        idClientes: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        razon_social: {
            type: Sequelize.STRING
        },
        nombre_comercial: {
            type: Sequelize.STRING
        },
        direccion_entrega: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'CLIENTES'
    });
    
    return clientes;
}

/*
table clientes
    idClientes INT 
    razon_social VARCHAR
    nombre_comercial VARCHAR
    direccion_entrega VARCHAR
    telefono VARCHAR
    email VARCHAR
*/