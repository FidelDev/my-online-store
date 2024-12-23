//proceso de enrutamiento productos dentro de la API.

module.exports = app => {
    const producto = require('../controllers/productos.controller.js');
    var routerProductos = require('express').Router();

    //URLs 
    routerProductos.post('/', producto.createProduct);//IN PROGRESS

    //ruta principal
    app.use('/api/productos', routerProductos);
}