'use strict';
const moment = require('moment')

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Course', [{
       name: '班主任',
       createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
       updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
     },
     {
       name: '语文',
       createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
       updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
     },
     {
       name: '数学',
       createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
       updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
     },
     {
       name: '英语',
       createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
       updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
     }
   ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Course', null, {})
  }
};
