//proceso de configuracion a conexión con la base de datos utilizando Sequelize
const dbconfig = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbconfig.BD, dbconfig.USER, dbconfig.PASSWORD, {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    logging: false,
    pool: dbconfig.pool
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Demás inicialización de modelos...
db.rol = require('../models/rol.model.js')(sequelize, Sequelize);
db.estados = require('../models/estados.model.js')(sequelize, Sequelize); //exportando estados --para realizar script automatico a la db

module.exports = db;
