'use strict';
const md5 = require('md5')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('teacher', {
      id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      openid: {
        type:Sequelize.STRING(28),
        allowNull: true
      },
      password: {
        type: Sequelize.STRING(32),
        allowNull: false,
        defaultValue: md5('123456')
      },
      avatarUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING(11),
        allowNull: true
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      tableName: 'teacher',
    }).then(() => {
      return queryInterface.addIndex('teacher', ['id'], {
        name: 'teacherId',
        unique: true
      })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('teacher');
  }
};