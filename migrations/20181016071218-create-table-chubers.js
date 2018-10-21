'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('chubers', {
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
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('chubers');
    }
};
