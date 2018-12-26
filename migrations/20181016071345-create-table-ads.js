'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('banners', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
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
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('banners');
    }
};
