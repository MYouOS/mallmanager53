// 该文件用于创建整个应用的路由器
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 创建一个路由器
export default new VueRouter({
    routes: [
        {
            path: '/',
        }
    ]
})
