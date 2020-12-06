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
      <a-form-item label="学号" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-input v-decorator="['id', { initialValue: value.id, rules: [{ required: true, message: '请输入学号'}] }]"></a-input>
      </a-form-item>
      <a-form-item label="姓名" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-input v-decorator="['name', { initialValue: value.name, rules: [{ required: true, message: '请输入姓名'}] }]"></a-input>
      </a-form-item>
      <a-form-item label="手机号码" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-input v-decorator="['phone', { initialValue: value.phone, rules: [{ required: true, message: '请输入手机号码'}] }]"></a-input>
      </a-form-item>
      <a-form-item label="班级" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-select v-decorator="['classIds', { initialValue: value.classes ? value.classes[0].id : '', rules: [{ required: true, message: '请选择班级'}] }]">
          <a-select-option :value="item.id" v-for="item in classes" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="课程" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-select mode="multiple" v-decorator="['courseIds', { initialValue: value.courses ? value.courses.map(cur => cur.id) : [], rules: [{ required: true, message: '请选择班课程'}] }]">
          <a-select-option :value="item.id" v-for="item in courses" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="职务" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-select v-decorator="['type', { initialValue: value.type, rules: [{ required: true, message: '请选择职务'}] }]">
          <a-select-option :value="0">授课教师</a-select-option>
          <a-select-option :value="1">班主任</a-select-option>
          <a-select-option :value="2">班主任兼授课老师</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="绑定状态" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-switch v-decorator="['status', { initialValue: !!value.status, valuePropName: 'checked' }]"></a-switch>
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
      classes: [
        {
          id: 0,
          name: '169001427班'
        }
      ],
      courses: [
        {
          id: 0,
          name: '课程0'
        },
        {
          id: 1,
          name: '课程1'
        },
        {
          id: 2,
          name: '课程2'
        },
        {
          id: 3,
          name: '课程3'
        }
      ]
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
