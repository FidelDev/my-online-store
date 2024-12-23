//Logica para las peticiones.

const db = require('../configs/db.config.js');

//--Insertar un registro. #NOTA: Usando sequelize.query proceso independiente al /model.js realizando inserción directamente a la DB mediante el script.
exports.create = async ( req, res ) => {
    const {razon_social, nombre_comercial, direccion_entrega, telefono, email} = req.body;

    const sql = `EXEC InsertarCliente @razon_social = :razon_social, @nombre_comercial = :nombre_comercial, @direccion_entrega = :direccion_entrega, @telefono = :telefono, @email = :email`;

    try {
        const result = await db.sequelize.query(sql , {
            replacements: {razon_social, nombre_comercial, direccion_entrega, telefono, email},
            type: db.Sequelize.QueryTypes.EXEC,
        });
        res.status(201).json({
            message: 'Cliente creado con exito.'
        });
    } catch (error) {
        res.status(500).json({message: 'Error al crear el cliente'});
        console.log('Error' + error);
    };
};

//--obteniendo todos los registros #NOTA:
/* Es util para consultas personalizada o no se requiere del model Sequelize. Se entiende que no es recomendado para tablas con miles o millones de registros: afecta al rendimiento al servidro y la DB para grandes volumenes de consultas implementar paginación y filtros para optimizar consultas. */
exports.findAll = async ( req, res ) => {
    try {
        const sql = `SELECT * FROM CLIENTES`;

        const clientes = await db.sequelize.query(sql, {
            type: db.Sequelize.QueryTypes.SELECT,
        });

        if(clientes.length > 0){
            res.status(200).json(clientes);
        }else {
            res.status(404).json({
                message: 'No se encontraron clientes registrados.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los clientes'
        });
        console.log('Error.', error);
    }
}

//--obteniendo un cliente por ID #NOTA: usando sequelize.query para consultas personalizada directamente a la DB independiente al /model.js
exports.findById = async ( req, res ) => {
    const { id } = req.params;

    try {
        //usando sequelize para buscar registro
        const cliente = await db.sequelize.query(`SELECT * FROM CLIENTES WHERE idClientes = :id`,{
            replacements: { id },
            type: db.Sequelize.QueryTypes.SELECT
        });
        if(cliente.length > 0){
            res.status(200).json(cliente[0]);
        }else {
            res.status(404).json({
                message: `el cliente cone el ID: ${id} no ha sido encontrado`
            });
        };
    } catch (error) {
        res.status(500).json({
            message: 'Error al buscar el cliente'
        });
        console.log('Error', error);
    };
};

//--actualizando un cliente por ID #NOTA: Usando sequelize.query proceso independiente al /model.js realizando actualizacion directamente a la DB mediante el script.
exports.update = async( req, res ) => {
    const { id } = req.params;
    const {razon_social, nombre_comercial, direccion_entrega, telefono, email} = req.body;

    const sql = `EXEC ActualizarCliente @idClientes = :id, @razon_social = :razon_social, @nombre_comercial = :nombre_comercial, @direccion_entrega = :direccion_entrega, @telefono = :telefono, @email = :email`

    try {
        const result = await db.sequelize.query(sql, {
            replacements: {id, razon_social, nombre_comercial, direccion_entrega, telefono, email},
            type: db.Sequelize.QueryTypes.EXEC
        });
        //VALIDAR
        if(result){
            res.status(200).json({
                message: `Cliente con el id:${id} actualizado con exito`
            });
        }else {
            res.status(404).json({
                message: `cliente con el id: ${id} no encontrado. `
            });
        };
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el cliente con el id: ',id
        });
        console.log('FAIL.!', error);
    };
};

//--Eliminando un cliente por ID #NOTA: usando sequelize.query independiente al /model.js me permite ejecutar script personalizadas directamente a la DB
exports.detele = async ( req, res ) => {
    const { id } = req.params;

    try {
        //forzando que la consulta devuelva la fila afectada :)
        const result = await db.sequelize.query(`DELETE FROM CLIENTES OUTPUT DELETED.idClientes WHERE idClientes = :id`, {
            replacements: { id },
            type: db.Sequelize.QueryTypes.DELETE
        });
        if(result.length > 0 ){
            res.status(200).json({
                message: `Cliente eliminado con el ID: ${id}`
            });
        }else {
            res.status(404).json({
                message: `cliente no encontrado con el ID ${id}`
            });
        };
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el cliente. '
        });
        console.log('fail' , error);
    };
};