// 该文件用于创建整个应用的路由器
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/login/login.vue'
// @ -> src
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Right from '@/components/rights/right.vue'

Vue.use(VueRouter)

// 创建一个路由器
export default new VueRouter({
    routes: [
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'home',
            path: '/',
            component: Home,
            children: [
                {
                    name: 'users',
                    path: 'users',
                    component: Users
                },
                {
                    name: 'right',
                    path: '/rights',
                    component: Right
                }
            ]
        }
    ]
})
