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
      <a-form-item label="姓名" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-input v-decorator="['name', { initialValue: value.name, rules: [{ required: true, message: '请输入姓名'}] }]"></a-input>
      </a-form-item>
      <a-form-item label="手机号码" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-input v-decorator="['phone', { initialValue: value.phone, rules: [{ required: true, message: '请输入手机号码'}] }]"></a-input>
      </a-form-item>
      <a-form-item label="绑定状态" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-switch v-decorator="['status', { initialValue: !!value.status, valuePropName: 'checked' }]"></a-switch>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
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
      headmasters: [
        {
          id: 0,
          name: '麻子'
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
  methods: {
    // 点击确定
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('ok', { ...values, id: this.value.id })
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
