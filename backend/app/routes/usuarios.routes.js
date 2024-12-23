//proceso de enrutamiento usuarios dentro de la API.

    const express = require('express');
    const routerUsuarios = express.Router();
    const usuarios = require('../controllers/usuarios.controller.js');

    routerUsuarios.post('/', usuarios.create);
    routerUsuarios.get('/allById/:id', usuarios.findById);
    routerUsuarios.put('/update/:id',usuarios.updateById);
    routerUsuarios.put('/inactivate/:id', usuarios.inactivate);
    routerUsuarios.put('/activate/:id', usuarios.activate);
    routerUsuarios.delete('/delete/:id', usuarios.deleteUser);

    module.exports = routerUsuarios;