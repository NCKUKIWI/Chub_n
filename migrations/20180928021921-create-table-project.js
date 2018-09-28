'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('project', {
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
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('project');
    }
};
