<template>
    <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <img class="img" src="../../assets/Taobao.png" alt="">
                    </div>
                </el-col>
                <el-col :span="14">
                    <div class="grid-content bg-purple-light">
                        <h3>淘宝电商后台管理系统</h3>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <a @click.prevent="handleSignout()" href="#">退出</a>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside class="aside" width="200px">
                <!-- 侧边栏导航 -->
                <!-- 1 -->
                <!-- 开启路由模式 -->
                <el-menu :router="true" :unique-opened="true">
                    <el-submenu :index="''+item1.order" v-for="(item1, index) in menus" :key="index">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item1.authName}}</span>
                        </template>
                        <el-menu-item :index="item2.path" v-for="(item2, index) in item1.children" :key="index">
                            <i class="el-icon-user-solid"></i>
                            <span>{{item2.authName}}</span>
                        </el-menu-item>
                    </el-submenu>

                </el-menu>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "HomeName",
        data() {
            return {
                menus: []
            }
        },
        beforeCreate() {
            // // 获取token
            // const token = localStorage.getItem('token')
            // // 有：继续渲染组件
            // // 无：退回登录页
            // if (!token) {
            //     this.$router.push({ name: 'login' })
            // }
        },
        created() {
            this.getMenus()
        },
        methods: {
            // 获取导航数据
            async getMenus() {
                const res = await this.$http.get(`menus`)
                // console.log(res)
                this.menus = res.data.data
            },
            handleSignout() {
                // 1.清除token
                localStorage.clear()
                // 2.提示
                this.$message.success('退出成功')
                // 3来到login组件
                this.$router.push({ name: 'login' })
            }
        },
    }
</script>

<style>
    .container {
        height: 100%;
    }

    .header {
        background-color: #b3c0d1;
    }

    .header img {
        width: 170px;
    }

    .header h3 {
        text-align: center;
        color: white;
    }

    .header a {
        text-decoration: none;
        line-height: 60px;
    }

    .aside {
        background-color: #d3dce6;
    }

    .main {
        background-color: #e9eef3;
    }
</style>