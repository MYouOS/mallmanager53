<template>
    <el-card>
        <!-- 1.面包屑 -->
        <!-- 首页/权限管理/权限列表 -->
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb> -->

        <my-bread level1="权限管理" level2="权限列表"></my-bread>

        <!-- 2.表格 -->
        <el-table :data="rightlist" border style="width: 100%" height="400px">
            <el-table-column type="index" label="#" width="60">
            </el-table-column>
            <el-table-column prop="authName" label="权限名称" width="180">
            </el-table-column>
            <el-table-column prop="path" label="路径">
            </el-table-column>
            <el-table-column label="层级">
                <template slot-scope="scope">
                    <!-- scope.row.level 0 1 2 -->
                    <span v-if="scope.row.level==='0'">一级</span>
                    <span v-if="scope.row.level==='1'">二级</span>
                    <span v-if="scope.row.level==='2'">三级</span>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

</template>

<script>
    export default {
        name: 'RightName',
        data() {
            return {
                rightlist: []
            }
        },
        created() {
            this.getRightslist()
        },
        methods: {
            async getRightslist() {

                // 除了登录之外的所有请求，都需要设置头部
                const res = await this.$http.get(`rights/list`)
                // console.log(res)
                this.rightlist = res.data.data
            }
        },
    }
</script>

<style>

</style>