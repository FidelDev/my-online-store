//Logica para las peticiones de USUARIOS #NOTA: leer los comentarios xfavor :(


const db = require('../configs/db.config.js');
const bcrypt = require('bcrypt');


//Insetar un registro.#nota: este metodo valida si el correo ya existe no registra pero notifica en la respuesta, encripta la contraseña.
exports.create = async ( req, res ) => {
    const {rol_idrol, estados_idestados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, clientes_idClientes} = req.body;

    const sqlCheck = `SELECT COUNT(*) AS count FROM USUARIOS WHERE correo_electronico = :correo_electronico`;

    try {
        //validar la consulta sqlCheck
        const [result] = await db.sequelize.query(sqlCheck, {
            replacements: {correo_electronico},
            type: db.Sequelize.QueryTypes.SELECT
        });
        if(result.count > 0){
            return res.status(400).json({
                message: 'El correo ya esta registrado: ', result
            });
        }
        //encriptar la contraseña
        const hashPassword = await bcrypt.hash(password,10);

        //insertando el registro.
        const sql = `EXEC InsertarUsuario @rol_idrol = :rol_idrol, @estados_idestados = :estados_idestados, @correo_electronico = :correo_electronico, @nombre_completo = :nombre_completo, @password = :password, @telefono = :telefono, @fecha_nacimiento = :fecha_nacimiento, @clientes_idClientes = :clientes_idClientes`;

        await db.sequelize.query(sql, {
            replacements: {
                rol_idrol, 
                estados_idestados, 
                correo_electronico, 
                nombre_completo, 
                password: hashPassword,//usando la variable ya encriptada  
                telefono, 
                fecha_nacimiento, 
                clientes_idClientes},
            type: db.Sequelize.QueryTypes.EXEC
        });

        res.status(201).json({
            message: 'Usuario creado con exito'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el usuario.'
        });
        console.log('ERROR: ', error);
    }
}

//Consultar un registro por ID #nota: el campo password a sido enmascarado para no exponer su valor real :)
exports.findById = async ( req, res ) => {
    const { id } = req.params;
    const sql = `select idusuarios, rol_idrol, estados_idestados, correo_electronico, nombre_completo, '********' as password, telefono, fecha_nacimiento, fecha_creacion, clientes_idclientes, password_needs_reset from usuarios where idusuarios = :id;`

    try {
        //--
        const usuario = await db.sequelize.query(sql, {
            replacements: { id },
            type: db.Sequelize.QueryTypes.SELECT
        });
        if(usuario.length > 0){
            res.status(200).json(usuario[0]);
        }else {
            res.status(404).json({
                message: `el cliente cone el ID: ${id} no ha sido encontrado`
            });
        };
    } catch (error) {
        res.status(500).json({
            message: 'Error al buscar los usuarios.'
        });
        console.log('ERROR', error);
    };
};

//Actualizar un registro. #nota: esta metodo es para el lado operador que pueda actualizar un usuario. para que el usuario pueeda cambiar su contraseña a la hora de su primer inicio de sesion :)
exports.updateById = async ( req, res ) => {
    const { id } = req.params;
    const {rol_idrol, estados_idestados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, clientes_idclientes } = req.body;

    if(!id || !rol_idrol || !estados_idestados || !correo_electronico || !nombre_completo){
        return res.status(400).json({
            message: "Datos incompletos. Verifica los campos requeridos."
        });
    };
        
    try {
        //consultando el campo de correo
        const sqlCheck = `SELECT idusuarios FROM USUARIOS WHERE correo_electronico = :correo_electronico;`;
        //validar el campo correo_electronico
        const [ExisteUs] = await db.sequelize.query(sqlCheck, {
            replacements: {correo_electronico},
            type: db.Sequelize.QueryTypes.SELECT
        });
        if(ExisteUs && ExisteUs.idusuarios !== parseInt(id)){
            return res.status(400).json({
                message: `El correo electronico ya esta registrado con otro usuario: (ID = ${ExisteUs.idusuarios}).`
            });
        };
        
        //Encripta la contraseña
        const hashPassword = await bcrypt.hash(password,10);

        //insertar
        const sql = `EXEC actualizarusuario @idusuarios = :idusuarios, @rol_idrol = :rol_idrol, @estados_idestados = :estados_idestados, @correo_electronico = :correo_electronico, @nombre_completo = :nombre_completo, @password = :password, @telefono = :telefono, @fecha_nacimiento = :fecha_nacimiento, @clientes_idclientes = :clientes_idclientes, @password_needs_reset = 1;`
        //el campo password-needs-reset siempre sera valor true "1" ya que el operador es quien actualiza el el registro.

        await db.sequelize.query(sql, {
            replacements: {idusuarios: id, rol_idrol, estados_idestados, correo_electronico, nombre_completo, password: hashPassword, telefono, fecha_nacimiento, clientes_idclientes},
            type: db.Sequelize.QueryTypes.UPDATE
        });

        res.status(200).json({
            message: `El usuario con el id: ${id} fue actualizado con exito.`
        })
    } catch (error) {
        console.log('ERROR', error);
        res.status(500).json({
            message: 'Error al actualizar el usuario', error
        });
    };
};

//Metodo para inactivar un USUARIO #nota: lo tome de esta manera ya que los usuarios se puede cambiar de estado activo a inactivo
exports.inactivate = async ( req, res ) => {
    const {id} = req.params;
    const {estados_idestados} = req.body;

    const sqlCheckstatus = `SELECT estados_idestados FROM USUARIOS WHERE idusuarios = :id;`;
    try {
        //valido el estado del usuario
        const [result] = await db.sequelize.query(sqlCheckstatus, {
            replacements: {id},
            type: db.sequelize.QueryTypes.SELECT
        });
        if(!result){
            return res.status(404).json({
                message: `El usuario con el id: ${id} no existe: `
            });
        };
        if (result.estados_idestados === 2){
                return res.status(400).json({
                    message: 'usuario Inactivo'
                });
        };

        //encriptando la contraseña temporal
        const hashPassword = await bcrypt.hash('Inactivate123',10);

        //realizando la consulta
        const sqlUpdate = `UPDATE USUARIOS
                            SET estados_idestados = :estados_idestados,
                                password = :password,
                                password_needs_reset = 1
                            WHERE idusuarios = :id`;
        //Realizando la actualizacion.
        await db.sequelize.query(sqlUpdate, {
            replacements: {id,estados_idestados, password: hashPassword},
            type: db.Sequelize.QueryTypes.UPDATE
        });
        res.status(200).json({
            message: 'EL usuario fue INACTIVO con exito'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al intentar inactivar el usuario.'
        });
        console.log('ERROR:', error);
    }
}
//Metedo para Activar un USUARIO
exports.activate = async ( req, res ) => {
    const {id} = req.params;
    const {estados_idestados, password} = req.body;

    if (!estados_idestados || !password) {
        return res.status(400).json({
            message: "Datos incompletos. Verifica los campos requeridos.",
        });
    }

    const sqlCheckstatus = `SELECT estados_idestados FROM USUARIOS WHERE idusuarios = :id;`;

    try {
        //validando el estado del USUARIO
        const [result] = await db.sequelize.query(sqlCheckstatus, {
            replacements: {id},
            type: db.Sequelize.QueryTypes.SELECT
        });
        if(!result){
            return res.status(404).json({
                message: `El usuario con el ID: ${id} no existe.`
            });
        };
        if(result.estados_idestados === 1){
            return res.status(100).json({
                message: 'usuario ACTIVO'
            });
        };

        //encriptando la contraseña temporal
        const hashPassword = await bcrypt.hash(password,10);
        //realizando la consulta
        const sqlUpdate = `UPDATE USUARIOS SET estados_idestados= :estados_idestados, password = :password, password_needs_reset = 1 WHERE idusuarios = :id`
        //realizando actualizacion
        await db.sequelize.query(sqlUpdate, {
            replacements: {id, estados_idestados, password: hashPassword},
            type: db.Sequelize.QueryTypes.UPDATE
        });
        res.status(200).json({
            message: 'el usuario fue activado con exito.'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al activar el usuario.'
        });
        console.log('ERROR: ', error);
    };
}

//Eliminar un registro #nota: solo un superAdmin tenga el privilegio de eliminar usuarios inactivos.
exports.deleteUser = async (req, res) => {
    const { id: targetId } = req.params;
    const { id, correo_electronico, password } = req.body;
//consultado los credenciales de un ingresados si tienen el rol administrador
    const sqlCheckAdmin = `
        SELECT u.idusuarios, u.password, u.correo_electronico, r.nombre AS rol
        FROM USUARIOS u
        INNER JOIN ROL r ON u.rol_idrol = r.idrol
        WHERE u.idusuarios = :id AND r.nombre = 'Administrador';
    `;
//consulta el status del usuario "inactivo"
    const sqlCheckStatus = `
        SELECT estados_idestados
        FROM USUARIOS
        WHERE idusuarios = :targetId;
    `;
//consulta los datos del usuario
    const sqlDeleteUser = `
        DELETE FROM USUARIOS
        WHERE idusuarios = :targetId;
    `;

    try {
        // Validar si el usuario es administrador
        const [adminData] = await db.sequelize.query(sqlCheckAdmin, {
            replacements: { id },
            type: db.Sequelize.QueryTypes.SELECT,
        });

        if (!adminData) {
            return res.status(403).json({
                message: 'No tienes permiso para eliminar un usuario inactivo.',
            });
        }

        // console.log("contrasela que esta en la base de datos:", adminData.password);
        // console.log("Correo que esta en la base de datos:", adminData.correo_electronico);

        // Validar correo electrónico
        if (adminData.correo_electronico !== correo_electronico) {
            return res.status(401).json({
                message: 'Correo electrónico no valido.',
            });
        }

        // Validar contraseña del administrador
        const normalizedPassword = password.trim();
        const isPasswordValid = await bcrypt.compare(normalizedPassword, adminData.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                //message: `Contraseña incorrecta. Proporcionada: ${normalizedPassword}, Hash almacenado: ${adminData.password}`,
                message: 'Contrasña no valido'
            });
        }

        // verificar el estado del usuario antes de eliminar
        const [userStatus] = await db.sequelize.query(sqlCheckStatus, {
            replacements: { targetId },
            type: db.Sequelize.QueryTypes.SELECT,
        });

        if (!userStatus) {
            return res.status(404).json({
                message: 'El usuario que deseas eliminar no existe.',
            });
        }

        if (userStatus.estados_idestados !== 2) {
            return res.status(400).json({
                message: 'Solo se pueden eliminar usuarios con estado inactivo.',
            });
        }

        //Eliminar un usuario por los credenciales correctos
        await db.sequelize.query(sqlDeleteUser, {
            replacements: { targetId },
            type: db.Sequelize.QueryTypes.DELETE,
        });

        res.status(200).json({
            message: `El usuario con el id: ${targetId} fue eliminado exitosamente.`,
        });
    } catch (error) {
        console.error('ERROR: ', error);
        res.status(500).json({
            message: 'Error al eliminar el usuario.',
        });
    }
};

//gracias por llegar aqui :)