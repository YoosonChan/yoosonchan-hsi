'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('student', {
      id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      headmasterId: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      classId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'class',
          key: 'id'
        }
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
      tableName: 'student'
    }).then(() => {
      return queryInterface.addIndex('student', ['id'], {
        name: 'studentId',
        unique: true
      })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('student');
  }
};