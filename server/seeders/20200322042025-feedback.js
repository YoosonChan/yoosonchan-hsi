'use strict';
const moment = require('moment')

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Feedback', [{
        id: 1,
        title: "标题标题",
        parentId: 1,
        teacherId: "0012",
        status: 2,
        type: 0,
        content: "内容内容内容",
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 2,
        title: "标题标题",
        parentId: 1,
        teacherId: "0012",
        status: 2,
        type: 1,
        content: "内容内容内容",
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 3,
        title: "标题标题",
        parentId: 1,
        teacherId: "0012",
        status: 2,
        type: 2,
        content: "内容内容内容",
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 4,
        title: "标题标题",
        parentId: 1,
        teacherId: "0012",
        status: 2,
        type: 3,
        content: "内容内容内容",
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 5,
        title: "标题标题",
        parentId: 1,
        teacherId: "0012",
        status: 2,
        type: 4,
        content: "内容内容内容",
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Feedback', null, {});
  }
};
