//proceso de enrutamiento estados dentro de la API.
const express = require('express');
const routerEstados = express.Router();
const estados = require('../controllers/estados.controller');

//configurando las rutas para estados
routerEstados.post('/', estados.create);
routerEstados.get('/allStates',estados.findAllState);
routerEstados.get('/:id', estados.findById);
routerEstados.put('/:idestados', estados.update);
routerEstados.delete('/:id', estados.delete);

//exportando
module.exports = routerEstados;