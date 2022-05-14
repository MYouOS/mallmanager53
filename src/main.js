import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
// 引入自定义面包屑组件 MyBread其实是组件选项所在的对象{templete:'',data(){return{}}}
import MyBread from '@/components/cuscom/myBread.vue'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/CSS/reset.css'
import MyServerHttp from '@/plugins/http.js'
import moment from 'moment'

// 回顾axios
// import axios from 'axios'
// Vue.prototype.$http=axios

// 适用Vue插件
Vue.use(ElementUI)
Vue.use(MyServerHttp)

Vue.config.productionTip = false

// 全局过滤器--处理日期
Vue.filter('fmtdate', (v) => {
  v *= 1100
  return moment(v).format('YYYY-MM-DD')
})

// 全局自定义组件
Vue.component(MyBread.name, MyBread)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
