export default [
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '类型',
    dataIndex: 'type',
    scopedSlots: {
      customRender: 'type'
    },
  },
  {
    title: '家长',
    dataIndex: 'parent'
  },
  {
    title: '教师',
    dataIndex: 'teacher'
  },
  {
    title: '内容',
    dataIndex: 'content',
    scopedSlots: {
      customRender: 'content'
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: {
      customRender: 'status'
    }
  },
  {
    title: '操作',
    dataIndex: 'operator',
    scopedSlots: {
      customRender: 'operator'
    }
  }
]
