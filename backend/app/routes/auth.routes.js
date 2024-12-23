// gestiona las rutas relacionadas con la autenticación de usuarios
const { Router } = require('express');
const controller = require('../controllers/auth.controller');

const router = Router();

router.post('/signin', controller.signIn);

module.exports = router;
