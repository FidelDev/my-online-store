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




/* --Tabla OrdenDetalles
CREATE TABLE OrdenDetalles (
    idOrdenDetalles INT IDENTITY (1,1) PRIMARY KEY,
    Orden_idOrden INT NOT NULL,
    Productos_idProductos INT NOT NULL,
    cantidad INT NOT NULL,
    precio FLOAT DEFAULT 0.00 NOT NULL,
    subtotal FLOAT DEFAULT 0.00 NOT NULL,
    FOREIGN KEY (Orden_idOrden) REFERENCES ORDEN(idOrden),
    FOREIGN KEY (Productos_idProductos) REFERENCES PRODUCTOS(idProductos)
);
select * from OrdenDetalles

--creando un triggers para el campo subtotal automatizando el calculo (cantidad*precio)

CREATE TRIGGER CalculandoSubtotal
ON OrdenDetalles
AFTER INSERT, UPDATE
AS
BEGIN
    UPDATE OrdenDetalles
    SET subtotal = inserted.cantidad * inserted.precio
    FROM OrdenDetalles
    INNER JOIN inserted ON OrdenDetalles.idOrdenDetalles = inserted.idOrdenDetalles;
END; */  


/*
--table ordenDetalles
    idOrdenDetalles INT
    Orden_idOrden INT
    Productos_idProductos INT
    cantidad INT
    precio FLOAT
    subtotal FLOAT
);
*/