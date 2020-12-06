'use strict';
const moment = require('moment')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Class', [{
        name: '1000班',
        headmasterId: '0012',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        name: '1001班',
        headmasterId: '0013',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        name: '1002班',
        headmasterId: '0014',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        name: '1003班',
        headmasterId: '0015',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Class', null, {})
  }
};
