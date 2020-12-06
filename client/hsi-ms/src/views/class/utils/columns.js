export default [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '课程',
    dataIndex: 'courses',
    scopedSlots: {
      customRender: 'courses'
    },
  },
  {
    title: '教师',
    dataIndex: 'teachers',
    scopedSlots: {
      customRender: 'teachers'
    },
  },
  {
    title: '班主任',
    dataIndex: 'headmaster',
    scopedSlots: {
      customRender: 'headmaster'
    },
  },
  {
    title: '操作',
    dataIndex: 'operator',
    scopedSlots: {
      customRender: 'operator'
    },
  }
]
