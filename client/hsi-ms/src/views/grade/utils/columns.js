export default [{
    title: '学号',
    dataIndex: 'studentId'
  },
  {
    title: '姓名',
    dataIndex: 'student'
  },
  {
    title: '班级',
    dataIndex: 'class'
  },
  {
    title: '学期',
    dataIndex: 'term',
  },
  {
    title: '课程',
    dataIndex: 'course'
  },
  {
    title: '场次',
    dataIndex: 'type',
    filters: [{
        text: '入学测试',
        value: '入学测试',
      },
      {
        text: '期中测试',
        value: '期中测试',
      },
      {
        text: '摸底测试',
        value: '摸底测试',
      },
      {
        text: '期末测试',
        value: '期末测试',
      },
    ],
    onFilter: (value, record) => record.type.indexOf(value) === 0
  },
  {
    title: '分数',
    dataIndex: 'score',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.score - b.score
  },
  {
    title: '操作',
    dataIndex: 'operator',
    scopedSlots: {
      customRender: 'operator'
    },
  }
]