import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/Index.vue';
import Login from '../views/login/Login.vue';
// import menu from '../utils/menu';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '/index',
    name: '首页',
    component: Index,
    children: [{
      path: '/student',
      name: '学生管理',
      component: () => import('../views/student/Student.vue'),
    }, {
      path: '/teacher',
      name: '教师管理',
      component: () => import('../views/teacher/Teacher.vue'),
    }, {
      path: '/parent',
      name: '家长管理',
      component: () => import('../views/parent/Parent.vue'),
    }, {
      path: '/term',
      name: '学期管理',
      component: () => import('../views/term/Term.vue'),
    }, {
      path: '/class',
      name: '班级管理',
      component: () => import('../views/class/Class.vue'),
    }, {
      path: '/course',
      name: '课程管理',
      component: () => import('../views/course/Course.vue'),
    }, {
      path: '/grade',
      name: '成绩管理',
      component: () => import('../views/grade/Grade.vue'),
    }, {
      path: '/release',
      name: '公告管理',
      component: () => import('../views/release/Release.vue'),
    }, {
      path: '/feedback',
      name: '反馈管理',
      component: () => import('../views/feedback/Feedback.vue'),
    }, ]
  },
];

const router = new VueRouter({
  routes
});

// router.beforeEach((to, from, next) => {
//   console.log(to, from)
//   if (to.path.includes('/index') && from.path.includes('/login')) {
//     addMenu()
//   }
//   next()
// })

// function addMenu() {
//   routes.forEach(cur => {
//     if (cur.path.includes('/index')) {
//       cur.children = menu.reduce((memo, cur, index) => {
//         memo[index] = {
//           path: `/index${cur.router}`,
//           name: cur.router.slice(1),
//           component: import(`@${cur.path}`)
//         };
//         return memo;
//       }, [])
//       console.log(routes)
//     }
//   })
// }

// function view(path) {
//   return function (resolve) {
//     import(`src${path}`).then(mod => {
//       resolve(mod)
//     })
//   }
// }

export default router
