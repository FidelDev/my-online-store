//maneja la logica para las peticiones a la base de datos

const db = require('../configs/db.config.js');
const Estados = db.estados;

//--creando un nuevo registro. //PROCESO independiente de los parametros de /model.js donde se puede realizar script complejas para hacer consultas a la bd a travez de sequelize.query.
exports.create = async (req, res) => {
    const { nombre } = req.body;//id, 

    const sql = `EXEC InsertarEstado @nombre = :nombre`;

    try {
        //consulta usando sequelize
        const result = await db.sequelize.query(sql , {
            replacements: { nombre },//id, 
            type: db.Sequelize.QueryTypes.EXEC,
        });
        res.status(201).json({
            //isSuccess: true,
            //data: result
            message: 'Estado creado con exito'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear'});
        console.log('ERROR' + error);
    }
}

//Actualizando un registro.
exports.update = async (req, res) => {
    const {idestados} = req.params;
    const {nombre} = req.body;

    const sql = `EXEC ActualizarEstado @idestados = :idestados, @nombre = :nombre`;

    try {
        const result = await db.sequelize.query(sql, {
            replacements: {idestados,nombre},
            type: db.Sequelize.QueryTypes.EXEC,
        });
        //request
        if(result){
            res.status(200).json({
                message: `Estado con ID=${idestados} actualizado con éxito`,
            });
        } else {
            res.status(404).json({
                message: `Estado con ID=${idestados} no encontrado`,
            });
        };
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado'});
        console.log('Error',error);
    }
}

//--obteniendo todos los registros #NOTA:
/* Es util para consultas personalizada o no se requiere del model Sequelize. Se entiende que no es recomendado para tablas con miles o millones de registros: afecta al rendimiento al servidro y la DB para grandes volumenes de consultas implementar paginación y filtros para optimizar consultas. */
exports.findAllState = async ( req, res ) => {
    try {
        const sql = `SELECT * FROM ESTADOS`;

        const estados = await db.sequelize.query(sql, {
            type: db.Sequelize.QueryTypes.SELECT
        });

        if(estados.length > 0){
            res.status(200).json(estados);
        }else {
            res.status(404).json({
                message: 'No se encontraron los registros.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los estados'
        });
        console.log('ERROR: ', error);
    }
}

//Realizar una busqueda por ID: //usanod un modelo de sequelize PROCESO dependiente a sequelize exportados de los parametros de /model.js donde sequelize realiza el script para la DB
exports.findById = (req, res) => {
    const id = req.params.id;

    Estados.findByPk(id).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: 'Error al buscar el Estado con el id =' + id
        });
    });
};

//Eliminar un registro.
exports.delete = (req, res) => {
    const id = req.params.id;

    Estados.destroy({
        where: {idestados: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: 'Estado eliminado con exito.'
            });
        } else {
            res.send({
                message: `No se pudo eliminar el estado con el id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `No se pudo eliminar el estado con el ID: ${id}`
        });
    });
};

//Dios tengo dolor de cabeza :(