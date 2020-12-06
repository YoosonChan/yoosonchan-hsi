<template>
  <a-modal
    title="编辑"
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
      <a-form-item label="标题" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-input v-decorator="['title', {initialValue: value.title, rules: [{ required: true, message: '请输入标题'}] }]"></a-input>
      </a-form-item>
      <a-form-item label="类型" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-select v-decorator="['type', {initialValue: value.type, rules: [{ required: true, message: '请选择类型'}] }]">
          <a-select-option :value="item.id" v-for="item in type" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="班级" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-select v-decorator="['classId', {initialValue: value.classId, rules: [{ required: true, message: '请选择班级'}] }]">
          <a-select-option :value="item.id" v-for="item in classes" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="课程" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-select v-decorator="['courseId', {initialValue: value.courseId, rules: [{ required: true, message: '请选择课程'}] }]">
          <a-select-option :value="item.id" v-for="item in courses" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="内容" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-textarea v-decorator="['content', {initialValue: value.content, rules: [{ required: true, message: '请输入内容'}] }]" :rows="4"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import request from './utils/request'
export default {
  name: "Edit",
  data () {
    return {
      form: this.$form.createForm(this),
      confirmLoading: false,
      type: [{id: 0, name: '公告'}, {id: 1, name: '作业'}, {id: 2, name: '统计'}],
      classes: [{id: 0, name: '169001427班'}],
      courses: [{id: 0, name: '课程0'}, {id: 1, name: '课程1'}, {id: 2, name: '课程2'}, {id: 3, name: '课程3'}, {id: 4, name: '课程4'}]
    }
  },
  props: {
    visible: {
      default: false
    },
    value: Object
  },
  mounted () {
    this.getClassList().then(res => {
        this.classes = res
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
          this.$emit('ok', { ...values, id: this.value.id })
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
