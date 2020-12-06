<template>
  <a-layout class="h-layout-container">
    <a-layout-sider
      theme="light"
      class="h-layout-sider"
      :trigger="null"
      collapsible
      v-model="collapsed"
      v-if="!!role"
    >
      <div class="h-layout-logo">
        <template v-if="!collapsed">
          <p>家校联动互助平台</p>
          <p>后台管理系统</p>
        </template>
        <template v-if="collapsed">
          <a-icon type="desktop"></a-icon>
        </template>
      </div>
      <a-menu class="h-layout-menu" mode="inline" :defaultSelectedKeys="defaultSelectedKeys">
        <a-menu-item key="student" v-if="role === 'admin' || role === 'headmaster'">
          <router-link to="/student">
            <a-icon type="user"></a-icon>
            <span>学生管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="teacher" v-if="role === 'admin'">
          <router-link to="/teacher">
            <a-icon type="solution"></a-icon>
            <span>教师管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="parent" v-if="role === 'admin' || role === 'headmaster'">
          <router-link to="/parent">
            <a-icon type="team"></a-icon>
            <span>家长管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="term" v-if="role === 'admin'">
          <router-link to="/term">
            <a-icon type="calendar"></a-icon>
            <span>学期管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="class" v-if="role === 'admin'">
          <router-link to="/class">
            <a-icon type="cluster"></a-icon>
            <span>班级管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="course" v-if="role === 'admin'">
          <router-link to="/course">
            <a-icon type="read"></a-icon>
            <span>课程管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="grade" v-if="role === 'admin' || role === 'headmaster'">
          <router-link to="/grade">
            <a-icon type="profile"></a-icon>
            <span>成绩管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="release" v-if="role === 'admin' || role === 'headmaster' || role === 'teacher'">
          <router-link to="/release">
            <a-icon type="sound"></a-icon>
            <span>公告管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="feedback" v-if="role === 'admin' || role === 'headmaster' || role === 'teacher'">
          <router-link to="/feedback">
            <a-icon type="bulb"></a-icon>
            <span>反馈管理</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="h-layout-main" v-if="!!role">
      <a-layout-header class="h-layout-header" style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          style="font-size: 1.3rem;"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"></a-icon>
        <div style="float: right; line-height: 48px;">
          <span>{{name}}</span>
          <span @click="handleLogout" style="margin-left: 16px; cursor: pointer;"><a-icon type="logout" /> 退出</span>
        </div>
      </a-layout-header>
      <a-breadcrumb style="margin: 16px 32px 0">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>{{title}}</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content class="h-layout-content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: "layoutPage",
  data() {
    return {
      collapsed: false,
      title: '',
      role: 'teacher',
      name: '',
      defaultSelectedKeys: ['student']
    }
  },
  watch: {
    $route (to, form) {
      this.title = to.name
    }
  },
  mounted() {
    this.role = localStorage.getItem('ROLE')
    this.name = localStorage.getItem('NAME')
    this.defaultSelectedKeys = [this.role === 'teacher' ? 'release' : 'student']
    console.log(this.role);
  },
  methods: {
    handleLogout () {
      this.$router.push('/login')
      localStorage.clear()
    }
  }
}
</script>
<style lang="less">
.h-layout-container {
  position: absolute;
  width: 100%;
  height: 100%;
  .h-layout-sider {
    height: 100%;
    border-right: 1px solid #e8e8e8;
    .h-layout-logo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 4.8rem;
      font-size: 1.1rem;
      background-color: #fff;
      text-align: center;
      p {
        margin-bottom: 0;
      }
    }
    .h-layout-menu {
      border-right: none;
    }
  }
  .h-layout-main {
    .h-layout-header {
      padding: 8px 16px !important;
      line-height: 54px !important;
    }
    .h-layout-content {
      min-height: 280px;
      margin: 8px 16px;
      padding: 24px 32px;
      background: #fff;
    }
  }
}
</style>
