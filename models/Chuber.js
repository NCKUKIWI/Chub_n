var db = require("./db");
var Sequelize = require("sequelize");

var chuberSchema = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    position: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    order: {
    	type: Sequelize.INTEGER,
    	defaultValue: 0
    }
}

var Chuber = db.define('chubers', chuberSchema, {
    timestamps: false
});

module.exports = Chuber;