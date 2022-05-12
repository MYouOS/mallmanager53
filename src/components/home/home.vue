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
                        <a href="">退出</a>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside class="aside" width="200px">Aside</el-aside>
            <el-main class="main">Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "HomeName"
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