//Logica implementada para realizar las peticiona a la base de datos. #Nota: Leer los comentario adjuntado.
const db = require('../configs/db.config.js');

//Insertar un registro. #Nota:
exports.create = async ( req, res ) => {
    const {usuarios_idusuarios, nombre, estados_idestados} = req.body;

    
    try {
        const sql = `EXEC InsertarCategoriaProducto @usuarios_idusuarios = :usuarios_idusuarios, @nombre = :nombre,@estados_idestados = :estados_idestados`;

        await db.sequelize.query(sql, {
            replacements: {usuarios_idusuarios, nombre, estados_idestados},
            type: db.Sequelize.QueryTypes.EXEC
        });
        res.status(201).json({
            message: 'La categoria del producto a sido creado con exito.'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear la nueva categoria de productos'
        });
        console.log('ERROR: ', error);
    };
};

//Obtener todo los registros:
exports.findAllCatPro = async ( req, res ) => {
    try {
        const sql = `SELECT * FROM CategoriaProductos`;

        const CatPro = await db.sequelize.query(sql, {
            type: db.Sequelize.QueryTypes.SELECT,
        });
        if(CatPro.length > 0){
            res.status(200).json(CatPro);
        }else {
            res.status(404).json({
                message: 'No se encontraron categorias de prodcutos registrados.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las categorias de productos.'
        });
        console.log('ERROR: ', error);
    };
};

//Obtener una categoria de productos por el ID
exports.findById = async ( req, res ) => {
    const { id } = req.params;

    try {
        const sql = `SELECT usuarios_idusuarios, nombre, estados_idestados FROM CategoriaProductos WHERE idCategoriaProductos = :id`

        const CatPro = await db.sequelize.query(sql, {
            replacements: {id},
            type: db.Sequelize.QueryTypes.SELECT
        });
        if(CatPro.length > 0){
            res.status(200).json(CatPro[0])
        }else {
            res.status(404).json({
                message: "No se a encontra la categoria de productos con el"
            });
        };
    } catch (error) {
        res.status(500).json({
            message: 'Error al buscar la categoria de productos'
        });
        console.log('ERROR: ', error);
    };
};

//Actualizar un registro por el ID.
exports.update = async ( req, res ) => {
    const { id } = req.params;

    const {usuarios_idusuarios, nombre, estados_idestados} = req.body;//idCategoriaProductos, 

    const sql = `EXEC ActualizarCategoriaProducto @idCategoriaProductos = :id, @usuarios_idusuarios = :usuarios_idusuarios, @nombre = :nombre, @estados_idestados = :estados_idestados`//  
    try {
        const result = await db.sequelize.query(sql, {
            replacements: {id, usuarios_idusuarios, nombre, estados_idestados},
            type: db.Sequelize.QueryTypes.EXEC
        });
        //validar
        if(result){
            res.status(200).json({
                message: 'Categoria de productos actualizado con exito.'
            });
        }else{
            res.status(404).json({
                message: 'El'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar.'
        });
        console.log('Error: ', error);
    };
};

//Inactivar un producto. #NOTA: aun falta de implementarle un poco de seguridad.
exports.inactivate = async ( req, res ) => {
    const { id } = req.params;
    const {estados_idestados} = req.body;

    const sqlCheck = `SELECT estados_idestados FROM CategoriaProductos WHERE idCategoriaProductos = :id`;

    try {
        //validando el estado del usuario.
        const [result] = await db.sequelize.query(sqlCheck, {
            replacements: {id},
            type: db.Sequelize.QueryTypes.SELECT
        });
        if(!result){
            res.status(404).json({
                message: 'La categoria de productos no existe.'
            });
        };
        if(result.estados_idestados === 2){
            return res.status(400).json({
                message: 'categoria Inactivo'
            });
        };
        const sql = `UPDATE CategoriaProductos SET estados_idestados = :estados_idestados where idCategoriaProductos = :id`;
        //realizando la actualizacion
        await db.sequelize.query(sql, {
            replacements: {estados_idestados, id},
            type: db.Sequelize.QueryTypes.UPDATE
        });
        res.status(200).json({
            message: 'CategoriaProducto Inactivo con exito.'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al intentar inactivar una CategoriaProducto.'
        });
        console.log('ERROR: ',error);
    };
};

//Activar un producto. #nota: aun falta implementar un poco mas de seguridad
exports.activate = async ( req, res ) => {
    const {id} = req.params;
    const {estados_idestados} = req.body;

    const sqlCheck = `SELECT estados_idestados FROM CategoriaProductos WHERE idCategoriaProductos = :id`;

    try {
        //validar el estado del usuario.
        const [result] = await db.sequelize.query(sqlCheck, {
            replacements: {id},
            type: db.Sequelize.QueryTypes.SELECT
        });
        if(!result){
            res.status(404).json({
                message: 'La categoria de productos no existe.'
            });
        };
        if(result.estados_idestados === 1){
            return res.status(400).json({
                message: 'categoria Activo'
            });
        };
        const sql = `UPDATE CategoriaProductos SET estados_idestados = :estados_idestados where idCategoriaProductos = :id`;
        ///realizando la accion
        await db.sequelize.query(sql, {
            replacements: {estados_idestados, id},
            type: db.Sequelize.QueryTypes.UPDATE
        });
        res.status(200).json({
            message: 'CategoriaProducto Activo con exito.'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al intentar Activar una CategoriaProducto.'
        });
        console.log('ERROR: ',error);
    }
}
//eliminar un producto. #nota: implementar mas seguridad.
exports.delete = async ( req, res) => {
    const {id} = req.params;
    const {estados_idestados} = req.body;
    const sqlCheck = `SELECT estados_idestados FROM CategoriaProductos WHERE idCategoriaProductos = :id`;
    try {
        //validar el estado antes de eliminar.
        const [result] = await db.sequelize.query(sqlCheck, {
            replacements: {id},
            type: db.Sequelize.QueryTypes.SELECT
        });
        if(!result){
            res.status(404).json({
                message: 'La categoria de productos no existe'
            });
        };
        if(result.estados_idestados === 1){
            return res.status(400).json({
                message: 'La categoria productos esta "ACTIVO" no se puede eliminar.'
            });
        };
        const sql = `DELETE FROM CategoriaProductos WHERE idCategoriaProductos = :id`
        //validando accion
        await db.sequelize.query(sql, {
            replacements: {id},
            type: db.Sequelize.QueryTypes.DELETE
        });
        res.status(200).json({
            message: 'CategoriaProducto eliminado con exito.'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al intentar eliminar una CategoriaProducto.'
        });
        console.log('ERROR: ',error);
    }
}