var db = require("./db");
var Sequelize = require("sequelize");

var projectsSchema = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    subtitle: {
        type: Sequelize.STRING,
        unique: true
    },
    duration: {
        type: Sequelize.STRING,
        unique: true
    },
    mission: {
        type: Sequelize.STRING,
        unique: true
    },
    introduction: {
        type: Sequelize.STRING,
        unique: true
    },
    url: {
        type: Sequelize.STRING,
        unique: true
    }
}

var Project = db.define('projects', projectSchema, {
    timestamps: false
});

module.exports = Project;