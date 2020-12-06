'use strict';
const moment = require('moment')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Student', [{
        id: '1001',
        name: '陈芳洁',
        classId: 1,
        headmasterId: '0012',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: '1002',
        name: '陈祺然',
        classId: 1,
        headmasterId: '0012',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: '1003',
        name: '李滢滢',
        classId: 2,
        headmasterId: '0013',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: '1004',
        name: '赵芬芬',
        classId: 2,
        headmasterId: '0013',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: '1005',
        name: '赵秀雅',
        classId: 3,
        headmasterId: '0014',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Student', null, {})
  }
};
