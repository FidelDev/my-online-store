//Logica para las peticiones 

const db = require('../configs/db.config');
const Rol = db.rol;

//crea un nuevo registro de ROL
exports.create = (req, res) => {
    //validate request
    if(!req.body.nombre) {
        res.status(400).send({
            message: 'el campo no puede ser vacio.!'
        });
        return;
    }

    const rol = {
        nombre: req.body.nombre
    };

    Rol.create(rol).then(data=>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Se produjo algún error al crear el registro ROL'
        });
    });
};

//metodo FindAll debe funcionar xd
exports.findAllROL = async ( req, res ) => {
    Rol.findAll().then(rolInfos => {
        res.status(200).json({
            message: 'Obteniendo todos los Rol con exito',
            rol: rolInfos
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Error', err
        })
        console.log('Error: ' , err);
    });
};

//Hacer una consulta por idrol
exports.findById = (req, res) => {
    const id = req.params.id;

    Rol.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: 'Error al buscar el rol con el id ='+id
        });
    });
};
//Actualizar un registro
exports.update = (req, res) => {
    const id = req.params.id;
    Rol.update(req.body, {
        where: {idrol: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: 'Rol actualizado con exito'
            });
        } else {
            res.send({
                message: `No se pudo actualizar el rol con el ID=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar el ROL con id= "+id,
        });
        console.log('ERROR' + err);
    });
};
//Eliminar un registro con el ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Rol.destroy({
        where: {idrol: id }
    }).then(num => {
        if(num == 1){
            res.send({
                message: 'Rol eliminado con exito'
            });
        } else {
            res.send({
                message: `No se pudo eliminar el rol con el id= ${id}`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: 'No se pudo eliminar el rol con el id = '+id
        });
    });
};