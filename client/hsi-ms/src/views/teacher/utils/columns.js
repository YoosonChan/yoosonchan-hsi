export default [
  {
    title: '工号',
    dataIndex: 'id'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: 'openid',
    dataIndex: 'openid',
    scopedSlots: {
      customRender: 'openid'
    }
  },
  {
    title: '班级',
    dataIndex: 'classes',
    scopedSlots: {
      customRender: 'classes'
    }
  },
  {
    title: '课程',
    dataIndex: 'courses',
    scopedSlots: {
      customRender: 'courses'
    },
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    scopedSlots: {
      customRender: 'phone'
    }
  },
  {
    title: '职务',
    dataIndex: 'type',
    scopedSlots: {
      customRender: 'type'
    }
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
