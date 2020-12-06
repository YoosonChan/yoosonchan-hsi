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
      <a-form-item label="姓名" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入姓名'}] }]"></a-input>
      </a-form-item>
      <a-form-item label="电话号码" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-input v-decorator="['phone', { rules: [{ required: true, message: '请输入手机号码'}] }]"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: "Add",
  data () {
    return {
      form: this.$form.createForm(this),
      confirmLoading: false
    }
  },
  props: {
    visible: {
      default: false
    }
  },
  methods: {
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
