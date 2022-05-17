// 该文件用于创建整个应用的路由器
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/login/login.vue'
// @ -> src
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Right from '@/components/rights/right.vue'
import Role from '@/components/rights/role.vue'
import Goodslist from '@/components/goods/goodslist.vue'
import GoodsAdd from '@/components/goods/goodsadd.vue'
import CateParams from '@/components/goods/cateparams.vue'
import GoodScate from '../components/goods/goodscate.vue'
import { Message } from "element-ui";

Vue.use(VueRouter)

// 创建一个路由器
const router = new VueRouter({
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
                },
                {
                    name: 'roles',
                    path: '/roles',
                    component: Role
                },
                {
                    name: 'goods',
                    path: '/goods',
                    component: Goodslist
                },
                {
                    name: 'goodsadd',
                    path: '/goodsadd',
                    component: GoodsAdd
                },
                {
                    name: 'params',
                    path: '/params',
                    component: CateParams
                },
                {
                    name: 'categories',
                    path: '/categories',
                    component: GoodScate
                },
            ]
        }
    ]
})


// 在路由配置生效之前 统一判断token
// 路由守卫 在路由配置生效之前
// 路由/导航守卫
router.beforeEach((to, from, next) => {
    // console.log(to, from);
    // 如果要去的是登录 -> next()
    if (to.path === '/login') {
        next()
    } else {
        // 获取token
        const token = localStorage.getItem('token')
        // 有：继续渲染组件
        // 无：退回登录页
        if (!token) {
            // this.$router.push({ name: 'login' }) X
            Message.warning('回到登录页')
            router.push({ name: 'login' })
            return
        }
        next()
    }

})

export default router
