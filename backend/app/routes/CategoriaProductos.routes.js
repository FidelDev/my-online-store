//proceso de enrutamiento categorías de productos dentro de la API.
    const express = require('express');
    const routerCatPro = express.Router();
    const CatPro = require('../controllers/CategoriaProductos.controller.js');

    routerCatPro.post('/', CatPro.create);
    routerCatPro.get('/findAll/', CatPro.findAllCatPro);
    routerCatPro.get('/findById/:id', CatPro.findById);
    routerCatPro.put('/update/:id', CatPro.update);
    routerCatPro.put('/inactivate/:id', CatPro.inactivate);
    routerCatPro.put('/activate/:id', CatPro.activate);
    routerCatPro.delete('/delete/:id', CatPro.delete);

    //exportando rol
    module.exports = routerCatPro;
