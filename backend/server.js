//preparando el servidor.

const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Configuraciones del servidor
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const db = require('./app/configs/db.config');
const authRoutes = require('./app/routes/auth.routes');
const rolRoutes = require('./app/routes/rol.routes.js');
const estadosRoutes = require('./app/routes/estados.routes.js');
const clientesRoutes = require('./app/routes/clientes.routes.js');
const usuariosRoutes = require('./app/routes/usuarios.routes.js');
const CatproRoutes = require('./app/routes/CategoriaProductos.routes.js');

// Autenticación de la conexión a la base de datos
db.sequelize.authenticate().then(() => {
    console.log("HOLA GRACIAS POR USAR EL SISTEMA DE @FideDev");
}).catch(err => {
    console.error("No se pudo conectar a la base de datos:", err);
});

//usar directamente las rutas
app.use('/api/auth', authRoutes);
app.use('/api/rol', rolRoutes);
app.use('/api/estados',estadosRoutes);
app.use('/api/clientes',clientesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/categoriaproductos', CatproRoutes);

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Algo salió mal en el servidor' });
});

// Configuración del puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto ${PORT}.`);
});
