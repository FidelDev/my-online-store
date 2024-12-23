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


/* CREATE TABLE CategoriaProductos (
    idCategoriaProductos INT IDENTITY (1,1) PRIMARY KEY,
    usuarios_idusuarios INT NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    estados_idestados INT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuarios_idusuarios) REFERENCES USUARIOS(idusuarios),
    FOREIGN KEY (estados_idestados) REFERENCES ESTADOS(idestados)
);
select * from CategoriaProductos */


/*
    idCategoriaProductos INT
    usuarios_idusuarios INT 
    nombre VARCHAR
    estados_idestados INT 
    fecha_creacion DATETIME

*/