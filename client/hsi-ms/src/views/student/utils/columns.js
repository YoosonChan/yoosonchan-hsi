export default [
  {
    title: '学号',
    dataIndex: 'id'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '班级',
    dataIndex: 'class',
    scopedSlots: {
      customRender: 'class'
    }
  },
  {
    title: '家长',
    dataIndex: 'parents',
    scopedSlots: {
      customRender: 'parents'
    }
  },
  {
    title: '班主任',
    dataIndex: 'headmaster',
    scopedSlots: {
      customRender: 'headmaster'
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
