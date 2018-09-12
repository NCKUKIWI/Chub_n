'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: Sequelize.STRING,
                unique:true
            },
            password: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.INTEGER,
                defaultValue:0
            },
            created_at: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('users');
    }
};
