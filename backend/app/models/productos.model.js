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


/* 
--Tabla Productos
CREATE TABLE PRODUCTOS (
    idProductos INT IDENTITY (1,1) PRIMARY KEY,
    CategoriaProductos_idCategoriaProductos INT NOT NULL,
    usuarios_idusuarios INT NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    marca VARCHAR(45),
    código VARCHAR(45) UNIQUE,
    stock FLOAT DEFAULT 0.00,
    estados_idestados INT NOT NULL,
    precio FLOAT DEFAULT 0.00 NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    foto BINARY,
    FOREIGN KEY (CategoriaProductos_idCategoriaProductos) REFERENCES CategoriaProductos(idCategoriaProductos),
    FOREIGN KEY (usuarios_idusuarios) REFERENCES USUARIOS(idusuarios),
    FOREIGN KEY (estados_idestados) REFERENCES ESTADOS(idestados)
);
select * from PRODUCTOS */


/*
--Tabla Productos

    idProductos INT
    CategoriaProductos_idCategoriaProductos INT 
    usuarios_idusuarios INT
    nombre VARCHAR(45)
    marca VARCHAR(45)
    código VARCHAR(45)
    stock FLOAT
    estados_idestados INT
    precio FLOAT
    fecha_creacion DATETIME 
    foto BINARY,

);

select * from PRODUCTOS */