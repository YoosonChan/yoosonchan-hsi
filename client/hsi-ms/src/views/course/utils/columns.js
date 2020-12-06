export default [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '操作',
    dataIndex: 'operator',
    scopedSlots: {
      customRender: 'operator'
    },
  }
]
