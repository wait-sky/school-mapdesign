import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/reset.css'
import '@/assets/iconfont/iconfont.css'
if (!getToken()) {
  console.log('token 失效，跳转欢迎页面')
  sessionStorage.clear()
  router.push('/')
}

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
