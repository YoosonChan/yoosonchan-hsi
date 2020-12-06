<template>
  <div class="h-login-container">
    <div style="margin-bottom: 36px; text-align: center; line-height: 1; color: rgba(0, 0, 0, .45)">
      <h2>家校助学联动平台</h2>
      <h2>后台管理系统</h2>
    </div>
    <a-form
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item style="background-color: #fff;">
        <a-input v-decorator="['username', { rules: [{ required: true, message: '请输入工号' }] }]" placeholder="工号">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item style="background-color: #fff;">
        <a-input v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]" type="password" placeholder="登录密码" >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%;">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import request from './utils/request'
export default {
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    ...request,
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.handleLogin(values)
          // this.$router.push('/student')
        }
      })
    },
    async handleLogin (values) {
      let res = (await this.login(values)).data
      if (res.data.id) {
        this.$message.success(res.message)
        console.log(res.data);
        // 存储信息
        localStorage.setItem('INFO', JSON.stringify(res.data))
        // 角色判断
        let role = 'teacher'
        if (res.data.type === -1) {
          role =  'admin'
        } else if (res.data.type > 0) {
          role = 'headmaster'
        } else {
          role = 'teacher'
        }
        localStorage.setItem('ROLE', role)
        // 存储姓名
        localStorage.setItem('NAME', res.data.name)
        // 路由跳转
        if (res.data.type === -1 || res.data.type > 0) {
          this.$router.push('/student')
        } else {
          this.$router.push('/release')
        }
      } else {
        this.$message.info(res.message)
      }
    }
  }
}
</script>

<style lang="less">
body {
  background-color: rgba(0, 0, 0, .05) !important;
}
.h-login-container {
  width: 400px;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid rgba(0, 0, 0, .15);
  border-radius: 5px;
  box-sizing: border-box;
  transform: translateY(80%);
  background-color: #fff;
}
</style>
