'use strict';
const moment = require('moment')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Release', [{
        title: '关于寒假的通知',
        classId: 1,
        teacherId: '0013',
        courseId: 1,
        type: 0,
        content: '关于寒假放假时间的通知，以及寒假开学的公布',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '关于寒假语文作业的通知',
        classId: 2,
        teacherId: '0012',
        courseId: 2,
        type: 1,
        content: '关于寒假放假语文作业通知，以及家长对作业的辅导建议',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '关于寒假语文作业完成度的统计',
        classId: 2,
        teacherId: '0012',
        courseId: 2,
        type: 2,
        content: '关于寒假语文作业完成度的统计，家长对学生作业的完成进度，通过反馈老师进行统计',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Release', null, {})
  }
};
