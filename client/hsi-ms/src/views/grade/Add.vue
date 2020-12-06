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
        <a-input @change="handleQueryStudent" v-decorator="['studentId', { rules: [{ required: true, message: '请输入学号'}] }]"></a-input>
      </a-form-item>
      <a-form-item label="姓名" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-input v-decorator="['name', { initialValue: name, rules: [{ required: true, message: '请输入姓名'}] }]" disabled></a-input>
      </a-form-item>
      <a-form-item label="班级" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-select v-decorator="['classId', { initialValue: classId, rules: [{ required: true, message: '请选择班级'}] }]" disabled>
          <a-select-option :value="item.id" v-for="item in classes" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="课程" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-select v-decorator="['courseId', { rules: [{ required: true, message: '请选择课程'}] }]">
          <a-select-option :value="item.id" v-for="item in courses" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="学期" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-select v-decorator="['termId', { rules: [{ required: true, message: '请选择课程'}] }]">
          <a-select-option :value="item.id" v-for="item in terms" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="场次" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-auto-complete
          v-decorator="['type', {rules: [{ required: true, message: '请输入场次'}] }]"
          :data-source="['入学测试', '期中测验', '摸底测验', '期末测验']"
        ></a-auto-complete>
      </a-form-item>
      <a-form-item label="分数" :label-col="{span: 4}" :wrapper-col="{span: 17}">
        <a-input-number v-decorator="['score', { rules: [{ required: true, message: '请输入分数'}] }]" style="width: 100%"></a-input-number>
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
      name: '',
      classId: '',
      classes: [{id: 0, name: '169001427班'}],
      courses: [{id: 0, name: '课程0'}, {id: 1, name: '课程1'}, {id: 2, name: '课程2'}, {id: 3, name: '课程3'}, {id: 4, name: '课程4'}],
      terms: [{id: 0, name: '2019-2020下学期'}, {id: 1, name: '2019-2020上学期'}]
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
    this.getCourseList().then(res => {
        this.courses = res
    })
    this.getTermList().then(res => {
        this.terms = res
    })
  },
  methods: {
    ...request,
    // 点击确定
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('ok', values)
        }
      })
    },
    // 点击取消
    handleCancel () {
      this.$emit('cancel')
    },
    // 查找学生信息
    async handleQueryStudent (e) {
      let res = (await this.findInfo(e.target.value)).data.data
      if (res) {
        this.name = res.name
        this.classId = res.class.id
      }
    }
  }
}
</script>
