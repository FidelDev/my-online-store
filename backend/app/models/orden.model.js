module.exports = (sequelize, Sequelize) => {
    const Ordem = sequelize.define('orden', {
        idOrden:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        usuarios_idusuarios:{
            type: Sequelize.INTEGER
        },
        estados_idestados:{
            type: Sequelize.INTEGER
        },
        fecha_creacion:{
            type: Sequelize.DATETIME
        },
        nombre_completo:{
            type: Sequelize.STRING
        },
        direccion:{
            type: Sequelize.STRING
        },
        telefono:{
            type: Sequelize.STRING
        },
        correo_electronico:{
            type: Sequelize.STRING
        },
        fecha_entrega:{
            type: Sequelize.DATE
        },
        total_orden:{
            type: Sequelize.FLOAT
        }
    })
}

/* CREATE TABLE ORDEN (
    idOrden INT IDENTITY (1,1) PRIMARY KEY,
    usuarios_idusuarios INT NOT NULL,
    estados_idestados INT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    nombre_completo VARCHAR(155) NOT NULL,
    direccion VARCHAR(545) NOT NULL,
    telefono VARCHAR(45) NOT NULL,
    correo_electronico VARCHAR(100),
    fecha_entrega DATE NOT NULL,
    total_orden FLOAT DEFAULT 0.00 NOT NULL,
    FOREIGN KEY (usuarios_idusuarios) REFERENCES USUARIOS(idusuarios),
    FOREIGN KEY (estados_idestados) REFERENCES ESTADOS(idestados)
);
select * from ORDEN */


/* --table ORDEN
    idOrden INT
    usuarios_idusuarios INT
    estados_idestados INT
    fecha_creacion DATETIME
    nombre_completo VARCHAR(155)
    direccion VARCHAR(545)
    telefono VARCHAR(45)
    correo_electronico VARCHAR(100),
    fecha_entrega DATE
    total_orden FLOAT 
*/