export default [
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: 'openId',
    dataIndex: 'openId',
    scopedSlots: {
      customRender: 'openId'
    }
  },
  {
    title: '孩子',
    dataIndex: 'childes',
    scopedSlots: {
      customRender: 'childes'
    },
  },
  {
    title: '电话号码',
    dataIndex: 'phone',
    scopedSlots: {
      customRender: 'phone'
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: {
      customRender: 'status'
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
