//Logica para el procedimiento de las peticiones.

const db = require('../configs/db.config.js');

//insertar un registro.
exports.create = async ( req, res ) => {
    const { usuarioId, detalles } = req.body;

    const detallesStr = JSON.stringify(detalles);

    //preparando la consulta
    const sql = `EXEC InsertarOrdenConDetalles @usuarios_idusuarios = :usuarioId, @detalles = :detallesStr`;

    try {
        //ejecutando el procedimiento almaceando
        const result = await db.sequelize.query (sql, {
            replacements: {usuarioId, detallesStr},
            type: db.Sequelize.QueryTypes.RAW
        });
        res.status(200).send({
            message: 'Orden creada con Exito', usuarioId
        });
    } catch (error) {
        //majenado erroes
        res.status(500).send({
            message: 'Ocurrio un error al crear la orden'
        });
        console.log('ERROR', error);
    };
};

//Actualizando un registro.
exports.update = async ( req, res ) => {
    const { idOrden, usuarioId, detalles } = req.body;

    //convertir los detalles en una cadena JSON para el sp
    const detallesStr = JSON.stringify(detalles);

    const sql = `EXEC ActualizarOrdenConDetalles @idOrden = :idOrden, @usuarios_idusuarios = :usuarioId, @detalles = :detallesStr`;

    try {
        //ejecutando el procedimiento almacenado
        const result = await db.sequelize.query(sql, {
            replacements: { idOrden, usuarioId, detallesStr },
            type: db.Sequelize.QueryTypes.RAW
        });
        res.status(200).send({
        message: 'Orden actualizada con exito. ok.' , idOrden
        })
    } catch (error) {
        res.status(500).send({
            message: 'Error al actualizar la orden'
        });
        console.log('Error: ', error);
    };
};

//Obteniendo una orden con sus detalles por el ID
exports.findById = async ( req, res ) => {
    const { id } = req.params;

    const sql = `SELECT * FROM dbo.viewOrden WHERE idOrden = :id`;

    try {
        const result = await db.sequelize.query(sql, {
            replacements: {id},
            type: db.Sequelize.QueryTypes.SELECT
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send({
            message: 'Error al buscar la orde con su detalle'
        });
        console.log('ERROR: ', error);
    };
};