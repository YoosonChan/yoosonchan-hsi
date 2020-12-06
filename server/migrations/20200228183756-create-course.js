'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('course', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false
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
      tableName: 'course'
    }).then(() => {
      return queryInterface.addIndex('course', ['id'], {
        name: 'courseId',
        unique: true
      })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('course');
  }
};