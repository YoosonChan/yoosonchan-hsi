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
    title: '课程',
    dataIndex: 'course'
  },
  {
    title: '班级',
    dataIndex: 'class'
  },
  {
    title: '内容',
    dataIndex: 'content',
    scopedSlots: {
      customRender: 'content'
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
