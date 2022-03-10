import Vue from 'vue'
// import {Button, Radio, Row, Col, Link, Container, Header, Footer, Main, Aside} from 'element-ui'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from '@/App.vue'

import router from '@/router'
import store from '@/store'
import '@/api/mock'

import http from 'axios'

Vue.config.productionTip = false

Vue.use(ElementUi)
// Vue.use(Button)
// Vue.use(Radio)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Link)
// Vue.use(Container)
// Vue.use(Header)
// Vue.use(Footer)
// Vue.use(Main)
// Vue.use(Aside)

Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
