import Vue from 'vue'
import App from '@/App.vue'

import router from '@/router' // 路由
import store from '@/store' // 状态管理
import '@/permission'

import '@/plugins/element-ui' // element组件
import '@/api/mock' // 数据模拟

import http from 'axios' // 数据请求1
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
