//proceso de enrutamiento productos dentro de la API.

const express = require('express')
const routerOrdenConDetalles = express.Router();
const OrdenConDetalles = require ('../controllers/OrdenConDetalles.controller');

routerOrdenConDetalles.post('/', OrdenConDetalles.create);
routerOrdenConDetalles.put('/updateById', OrdenConDetalles.update);
routerOrdenConDetalles.get('/findById/:id', OrdenConDetalles.findById);



module.exports = routerOrdenConDetalles;