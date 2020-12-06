export default {
    pageSizeOptions: ['2', '10', '20', '30', '40', '100'],
    defaultCurrent: 1,
    defaultPageSize: 10,
    // showQuickJumper: true,
    // showSizeChanger: true,
    showTotal: (total, range) =>
        `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
}