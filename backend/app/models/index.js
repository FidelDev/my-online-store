//#NOTA: los procesos de conexion a la base datos fueron en los arvicos .env, env.js y db.configs.js se omite este archivo --Dejo constar el proceso anterior


//mandando parametros a la base de datos y comparando las credenciales correctas
/* const dbconfig = require('../configs/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbconfig.BD, dbconfig.USER, dbconfig.PASSWORD, {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    logging: false,
    pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.rol = require('./rol.model.js')(sequelize, Sequelize);

module.exports = db; */

