import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/CSS/reset.css'
import MyServerHttp from '@/plugins/http.js'

// 回顾axios
// import axios from 'axios'
// Vue.prototype.$http=axios

// 适用Vue插件
Vue.use(ElementUI)
Vue.use(MyServerHttp)

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
