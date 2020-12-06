import Vue from 'vue'
import App from './App'
// 组件导入
import hBtn from './components/hsi-ui/hBtn/hBtn.vue'
import hModal from './components/hsi-ui/hModal/hModal.vue'
import hTag from './components/hsi-ui/hTag/hTag.vue'
import hInput from './components/hsi-ui/hInput/hInput.vue'

Vue.config.productionTip = false
// 组件
Vue.component('h-btn', hBtn)
Vue.component('h-modal', hModal)
Vue.component('h-tag', hTag)
Vue.component('h-input', hInput)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
