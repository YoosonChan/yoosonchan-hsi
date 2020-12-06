<template>
  <a-modal
    title="新增"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="false"
    :maskClosable="false"
    okText="确认"
    cancelText="取消"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :form="form" @submit="handleOk">
      <a-form-item label="名称" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-input v-decorator="['name', {rules: [{ required: true, message: '请输入姓名'}] }]"></a-input>
      </a-form-item>
      <a-form-item label="课程" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-select mode="multiple" v-decorator="['courseIds', {rules: [{ required: true, message: '请选择班级'}] }]">
          <a-select-option :value="item.id" v-for="item in courses" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="教师" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-select mode="multiple" v-decorator="['teacherIds', {rules: [{ required: true, message: '请选择班级'}] }]">
          <a-select-option :value="item.id" v-for="item in teachers" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="班主任" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-select v-decorator="['headmasterId', {rules: [{ required: true, message: '请选择班主任'}] }]">
          <a-select-option :value="item.id" v-for="item in headmasters" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import request from './utils/request'
export default {
  name: "Add",
  data () {
    return {
      form: this.$form.createForm(this),
      confirmLoading: false,
      courses: [{id: 0, name: '课程0'}, {id: 1, name: '课程1'}, {id: 2, name: '课程2'}, {id: 3, name: '课程3'}, {id: 4, name: '课程4'}],
      teachers: [{id: 0, name: '麻子'}, {id: 1, name: '李四'}, {id: 2, name: '王五'}],
      headmasters: [{id: 0, name: '麻子'}, {id: 1, name: '李四'}, {id: 2, name: '王五'}]
    }
  },
  props: {
    visible: {
      default: false
    }
  },
  mounted () {
    this.getTeacherList().then(res => {
        this.teachers = res
    })
    this.getHeadmasterList().then(res => {
        this.headmasters = res
    })
    this.getCourseList().then(res => {
        this.courses = res
    })
  },
  methods: {
    ...request,
    // 点击确定
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('ok', values)
          this.handleCancel()
        }
      })
    },
    // 点击取消
    handleCancel () {
      this.$emit('cancel')
    }
  }
}
</script>
