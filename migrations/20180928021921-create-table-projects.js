'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('projects', {
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
                type: Sequelize.STRING
            },
            duration: {
                type: Sequelize.STRING
            },
            mission: {
                type: Sequelize.STRING
            },
            introduction: {
                type: Sequelize.STRING,
            },
            url: {
                type: Sequelize.STRING,
            },
            banner: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            pic: {
                type: Sequelize.STRING
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('projects');
    }
};
