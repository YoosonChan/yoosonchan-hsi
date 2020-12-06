'use strict';
const moment = require('moment')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CourseInfo', [{
        termId: 2,
        classId: 1,
        courseId: 1,
        teacherId: '0012',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 1,
        courseId: 2,
        teacherId: '0012',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 1,
        courseId: 3,
        teacherId: '0013',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 1,
        courseId: 4,
        teacherId: '0014',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 2,
        courseId: 1,
        teacherId: '0013',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 2,
        courseId: 2,
        teacherId: '0012',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 2,
        courseId: 3,
        teacherId: '0013',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 2,
        courseId: 4,
        teacherId: '0014',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 3,
        courseId: 1,
        teacherId: '0014',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 3,
        courseId: 1,
        teacherId: '0013',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 3,
        courseId: 2,
        teacherId: '0015',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 3,
        courseId: 3,
        teacherId: '0016',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 3,
        courseId: 4,
        teacherId: '0017',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 4,
        courseId: 1,
        teacherId: '0015',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 4,
        courseId: 2,
        teacherId: '0015',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 4,
        courseId: 3,
        teacherId: '0016',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 4,
        courseId: 4,
        teacherId: '0017',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        termId: 2,
        classId: 1,
        courseId: 1,
        teacherId: '0012',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CourseInfo', null, {});
  }
};