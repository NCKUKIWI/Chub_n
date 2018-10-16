var db = require("./db");
var Sequelize = require("sequelize");

var imageSchema = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    },
    project_id: {
        type: Sequelize.INTEGER
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}

var Image = db.define('images', imageSchema, {
    timestamps: false
});

module.exports = Image;