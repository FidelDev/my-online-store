//proceso de enrutamiento clientes dentro de la API.

const express = require('express');
const routerCliente = express.Router();
const cliente = require('../controllers/clientes.controller.js');

    //configurando las rutas
    routerCliente.post('/', cliente.create);
    routerCliente.get('/allClient', cliente.findAll);
    routerCliente.get('/allById/:id', cliente.findById);
    routerCliente.put('/update/:id', cliente.update);
    routerCliente.delete('/delet/:id', cliente.detele);

    //exportar el router
    module.exports = routerCliente;
