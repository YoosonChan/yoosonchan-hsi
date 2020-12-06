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
      <a-form-item label="学号" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-input v-decorator="['id', { rules: [{ required: true, message: '请输入学号'}] }]"></a-input>
      </a-form-item>
      <a-form-item label="姓名" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入姓名'}] }]"></a-input>
      </a-form-item>
      <a-form-item label="班级" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-select v-decorator="['classId', { rules: [{ required: true, message: '请选择班级'}] }]">
          <a-select-option :value="item.id" v-for="item in classes" :key="item.id">{{item.name}}</a-select-option>
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
      classes: []
    }
  },
  props: {
    visible: {
      default: false
    }
  },
  mounted () {
    this.getClassList().then(res => {
      this.classes = res
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
