'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('feedback', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'parent',
          key: 'id'
        }
      },
      teacherId: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'teacher',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
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
      tableName: 'feedback'
    }).then(() => {
      return queryInterface.addIndex('feedback', ['id'], {
        name: 'feedbackId',
        unique: true
      })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('feedback');
  }
};