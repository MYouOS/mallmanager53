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
                <el-menu :unique-opened="true">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item index="1-1">
                            <i class="el-icon-user-solid"></i>
                            <span>用户列表</span>
                        </el-menu-item>
                    </el-submenu>
                    <!-- 2 -->
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="1-1">
                            <i class="el-icon-s-custom"></i>
                            <span>角色列表</span>
                        </el-menu-item>
                        <el-menu-item index="1-1">
                            <i class="el-icon-s-tools"></i>
                            <span>权限列表</span>
                        </el-menu-item>
                    </el-submenu>
                    <!-- 3 -->
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>商品管理</span>
                        </template>
                        <el-menu-item index="1-1">
                            <i class="el-icon-s-goods"></i>
                            <span>商品列表</span>
                        </el-menu-item>
                        <el-menu-item index="1-1">
                            <i class="el-icon-s-help"></i>
                            <span>分类参数</span>
                        </el-menu-item>
                        <el-menu-item index="1-1">
                            <i class="el-icon-s-shop"></i>
                            <span>商品分类</span>
                        </el-menu-item>
                    </el-submenu>
                    <!-- 4 -->
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item index="1-1">
                            <i class="el-icon-s-order"></i>
                            <span>订单列表</span>
                        </el-menu-item>
                    </el-submenu>
                    <!-- 5 -->
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-locastion"></i>
                            <span>数据统计</span>
                        </template>
                        <el-menu-item index="1-1">
                            <i class="el-icon-s-data"></i>
                            <span>数据报表</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="main">Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "HomeName",
        beforeCreate() {
            // 获取token
            const token = localStorage.getItem('token')
            // 有：继续渲染组件
            // 无：退回登录页
            if (!token) {
                this.$router.push({ name: 'login' })
            }
        },
        methods: {
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