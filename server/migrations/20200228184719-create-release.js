'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('release', {
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
      classId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'class',
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
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'course',
          key: 'id'
        }
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
      tableName: 'release'
    }).then(() => {
      return queryInterface.addIndex('release', ['id'], {
        name: 'releaseId',
        unique: true
      })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('release');
  }
};