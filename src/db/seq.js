const { Sequelize } = require('sequelize');
const { MYSQL_HOST, MYSQL_PORT, MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD } = require('../config/config.default');
const seq = new Sequelize({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DB,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    dialect: 'mysql'
});


module.exports = seq;
