//proceso de enrutamiento ROL dentro de la API.
    const express = require('express');
    const router = express.Router();
    const rol = require('../controllers/rol.controller.js');
    
    // Configurando las rutas para 'rol'
    router.post('/', rol.create);
    router.get('/AllRol', rol.findAllROL);
    router.get('/:id', rol.findById);
    router.put('/:id', rol.update);
    router.delete('/:id', rol.delete);
    
    // Exportar el router
    module.exports = router;
    