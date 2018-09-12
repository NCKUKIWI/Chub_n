var Sequelize = require("sequelize");
var config = require("../config/db.json");
var env = "development";

var db = new Sequelize(config[env].database, config[env].username, config[env].password, {
    host: config[env].host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    query: {
        raw: true
    },
    logging: false
});

module.exports = db;