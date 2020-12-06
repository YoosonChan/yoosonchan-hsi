'use strict';
const moment = require('moment')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Grade', [{
        studentId: '1001',
        termId: 2,
        courseId: 2,
        classId: 1,
        type: '期末测试',
        score: 100,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        studentId: '1001',
        termId: 2,
        courseId: 3,
        classId: 1,
        type: '期末测试',
        score: 100,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        studentId: '1001',
        termId: 2,
        courseId: 4,
        classId: 1,
        type: '期末测试',
        score: 100,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        studentId: '1002',
        termId: 2,
        courseId: 2,
        classId: 1,
        type: '期末测试',
        score: 100,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Grade', null, {})
  }
};
