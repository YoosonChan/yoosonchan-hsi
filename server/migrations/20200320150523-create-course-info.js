'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('courseInfo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      termId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'term',
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
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'course',
          key: 'id'
        }
      },
      teacherId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'teacher',
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('courseInfo');
  }
};