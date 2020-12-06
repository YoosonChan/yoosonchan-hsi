<template>
  <div id="h-container">
    <div class="h-query">
      <a-form layout="inline">
        <a-form-item label="学号" :label-col="{span: 6}" :wrapper-col="{span: 17}">
          <a-input v-model="queryParams.id"></a-input>
        </a-form-item>
        <a-form-item label="姓名" :label-col="{span: 6}" :wrapper-col="{span: 17}">
          <a-input v-model="queryParams.name"></a-input>
        </a-form-item>
        <a-button @click="handleQuery" type="primary" style="margin-top: 4px;">查询</a-button>
      </a-form>
    </div>
    <div class="h-operator">
      <a-button @click="refresh" class="h-operator-btn">刷新</a-button>
      <a-button @click="visibleParams.add = true" type="primary" class="h-operator-btn">新增</a-button>
      <a-popconfirm
        title="确定删除选中？"
        :visible="visibleParams.batchDelete"
        @confirm="confirmBatchDelete"
        @cancel="cancelBatchDelete"
        @visibleChange="handleBatchDeleteVisibleChange"
        okText="确定"
        cancelText="取消"
      >
        <a-button type="danger" class="h-operator-btn">删除</a-button>
      </a-popconfirm>
      <!-- <a-button @click="handleExport" class="h-operator-btn">导出</a-button> -->
      <!-- <a-upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        >
        <a-button class="h-operator-btn"><a-icon type="upload"></a-icon>导入</a-button>
      </a-upload> -->
    </div>
    <div class="h-table">
      <a-table
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="data"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      >
        <span slot="class" slot-scope="text">{{text.name}}</span>
        <span slot="headmaster" slot-scope="headmaster">{{headmaster.length ? headmaster[0].name : ''}}</span>
        <span slot="parents" slot-scope="parents">
          <a-tag v-if="!parents.length">暂无</a-tag>
          <a-tag v-for="(name, index) in parents" :key="index" color="blue">{{name}}</a-tag>
        </span>
        <span slot="operator" slot-scope="text, record">
          <a-button-group>
            <a-button @click="handleClickEdit(record)" size="small" type="primary">编辑</a-button>
            <a-button @click="handleDelete(record)" size="small" type="danger">删除</a-button>
          </a-button-group>
        </span>
      </a-table>
    </div>
    <!--模态框-->
    <add
      :visible="visibleParams.add"
      @ok="handleAdd"
      @cancel="visibleParams.add = false"
      ></add>
    <edit
      :visible="visibleParams.edit"
      :value="editValue"
      @ok="handleEdit"
      @cancel="visibleParams.edit = false"
    ></edit>

  </div>
</template>
<script>
import columns from './utils/columns'
import pagination from './utils/pagination'
import request from './utils/request'
import data from './utils/data'
import Add from './Add'
import Edit from './Edit'

export default {
  name: 'Student',
  components: {Add, Edit},
  data () {
    return {
      columns,
      data,
      pagination,
      loading: false,
      selectedRowKeys: [],
      queryParams: {
        id: '',
        name: ''
      },
      visibleParams: {
        add: false,
        edit: false,
        batchDelete: false
      },
      editValue: {},
      excelName: '学生统计信息.csv'
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    ...request,
    // 表格选择行操作
    onSelectChange (selectedRowKeys) {
      console.log(selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    // 表格数据改变
    handleTableChange () {
      console.log('table change')
    },
    // 查询
    handleQuery () {
      console.log(this.queryParams);
      this.getList(this.queryParams).then(res => this.data = res)
    },
    // 刷新
    refresh () {
      this.getList().then(res => this.data = res)
    },
    /**
     * 添加
     */
    // 添加数据
    handleAdd (value) {
      this.upsert(value).then(res => {
        this.refresh()
      }).catch(err => {
        this.refresh()
      })
    },
    /**
     * 编辑
     */
    // 点击编辑
    handleClickEdit (value) {
      this.editValue = value
      this.visibleParams.edit = true
    },
    // 编辑
    handleEdit (value) {
      this.upsert(value).then(res => {
        this.refresh()
      }).catch(err => {
        this.refresh()
      })
    },
    /**
     * 批量删除
     */
    // 确认批量删除
    confirmBatchDelete () {
      let ids = this.selectedRowKeys.join(',')
      this.del(ids).then(res => {
        this.refresh()
      }).catch(err => {
        this.refresh()
      })
    },
    // 取消批量删除
    cancelBatchDelete () {
      this.$message.info('取消批量删除')
    },
    // 判断批量删除
    handleBatchDeleteVisibleChange (visible) {
      console.log(visible)
      if (visible && this.selectedRowKeys.length > 0) {
        this.visibleParams.batchDelete = true
      } else if (this.selectedRowKeys.length <= 0) {
        this.$message.error('请选择要删除对象')
      } else {
        this.visibleParams.batchDelete = false
      }
    },
    /**
     * 删除
     */
    handleDelete (value) {
      let ids = value.id
      this.del(ids).then(res => {
        this.refresh()
      }).catch(err => {
        this.refresh()
      })
    },
    /**
     * 导出
     */
    handleExport () {
      //列标题，逗号隔开，每一个逗号就是隔开一个单元格
      let str = `学号,姓名,id,班级,家长,id,班主任\n`;
      //增加\t为了不让表格显示科学计数法或者其他格式
      this.data.forEach(data => {
        Object.values(data).forEach(cur => {
          let value = cur
          if (Array.isArray(value)) {
            value = value.join('，')
          }
          str += `${value}\t,`
        })
          str += '\n'
      })
      console.log(str)
      //encodeURIComponent解决中文乱码
      let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
      //通过创建a标签实现
      let link = document.createElement("a")
      link.href = uri
      //对下载的文件命名
      link.download = this.excelName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
</script>
