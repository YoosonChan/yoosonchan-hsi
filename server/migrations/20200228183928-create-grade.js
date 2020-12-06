'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('grade', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      studentId: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'student',
          key: 'id'
        }
      },
      termId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'term',
          key: 'id'
        }
      },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'course',
          key: 'id'
        }
      },
      classId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'class',
          key: 'id'
        }
      },
      type: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      score: {
        type: Sequelize.INTEGER,
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
      tableName: 'grade'
    }).then(() => {
      return queryInterface.addIndex('grade', ['id'], {
        name: 'gradeId',
        unique: true
      })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('grade');
  }
};