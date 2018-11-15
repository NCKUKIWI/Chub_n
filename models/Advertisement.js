var db = require("./db");
var Sequelize = require("sequelize");

var ADSchema = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    url: {
    	type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    order: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    show: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    image: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
}

var Advertisement = db.define('advertisements', ADSchema, {
    timestamps: false
});

module.exports = Advertisement;