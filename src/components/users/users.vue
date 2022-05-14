<template>
    <el-card class="box-cord">
        <!-- 1.面包屑 -->
        <!-- 首页/用户管理/用户列表 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 2.搜索 -->
        <el-row class="searchRow">
            <el-col>
                <el-input @click.native="loadUserList()" clearable placeholder="请输入内容" v-model="query"
                    class="inputSearch">
                    <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button @click="showAddUserDia()" type="success">添加用户</el-button>
            </el-col>
        </el-row>

        <!-- 3.表格 -->
        <el-table :data="userlist" style="width: 100%">
            <el-table-column type="index" label="#">
            </el-table-column>
            <el-table-column prop="username" label="姓名">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="mobile" label="电话">
            </el-table-column>
            <el-table-column label="创建时间">
                <!-- 如果单元格内显示的内容不是字符串（文本），需要给被显示的内容外层包裹template标签 -->

                <!-- template内部要用数据 设置slot-scope属性，该属性的值是要用数据(create_time)的数据源(userlist) -->

                <!-- slot-scope的值userlist其实就是el-table绑定的数据userlist
                     userlist.row -> 数组中的每个对象
                -->
                <template slot-scope="scope">
                    {{scope.row.create_time | fmtdate}}
                </template>
            </el-table-column>
            <el-table-column label="用户状态">
                <template slot-scope="scope">
                    <el-switch @change="changeMgState(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                    <el-button @click="showEditUserDia(scope.row)" size="mini" plain type="primary" icon="el-icon-edit"
                        circle>
                    </el-button>
                    <el-button @click="showDelUserMsgBox(scope.row.id)" size="mini" plain type="danger"
                        icon="el-icon-delete" circle></el-button>
                    <el-button @click="showSetUserRoleDia(scope.row)" size="mini" plain type="success"
                        icon="el-icon-check" circle></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 4.分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
            :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <!-- 对话框 -->
        <!-- 添加用户 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisibleadd">
            <el-form :model="form">
                <el-form-item label="用户名" label-width="100px">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密 码" label-width="100px">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮 箱" label-width="100px">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电 话" label-width="100px">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleadd = false">取 消</el-button>
                <el-button type="primary" @click="addUser()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑用户 -->
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
            <el-form :model="form">
                <el-form-item label="用户名" label-width="100px">
                    <el-input disabled v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮 箱" label-width="100px">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电 话" label-width="100px">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                <el-button type="primary" @click="editUser()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 分配角色 -->
        <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
            <el-form :model="form">
                <el-form-item label="用户名" label-width="100px">
                    {{currUsername}}
                </el-form-item>
                <el-form-item label="角 色" label-width="100px">
                    <!-- 如果外层select绑定的数据的值 和 option的value一样 就会显示该option的label值 -->
                    <el-select v-model="currRoleId">
                        <el-option label="请选择" :value="-1"></el-option>
                        <el-option v-for="(item, i) in roles" :key="i" :label="item.roleName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
                <el-button type="primary" @click="setRole()">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
    export default {
        name: 'UsersName',
        data() {
            return {
                query: '',
                // 表格绑定的数据
                userlist: [],
                // 分页相关数据
                total: -1,
                pagenum: 1,
                pagesize: 2,
                // 添加对话框的属性
                dialogFormVisibleadd: false,
                dialogFormVisibleEdit: false,
                dialogFormVisibleRol: false,
                // 添加用户的表单数据
                form: {
                    // username用户名称不能为空
                    // password用户密码不能为空
                    // email邮箱可以为空
                    // mobile手机号可以为空
                    username: '',
                    password: '',
                    email: '',
                    mobile: ''
                },
                // 分配角色
                currRoleId: -1,
                currUserId: -1,
                currUsername: '',
                // 保存所有的角色
                roles: []
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            // 搜索用户
            searchUser() {
                // 按照input绑定的query参数发请求
                this.getUserList()
            },
            // 清空搜索框重新获取数据
            loadUserList() {
                this.getUserList()
            },
            // 添加用户 - 显示对话框
            showAddUserDia() {
                this.form = {}
                this.dialogFormVisibleadd = true
            },
            // 添加用户 - 发送请求
            async addUser() {
                // 2.关闭对话框
                this.dialogFormVisibleadd = false
                const res = await this.$http.post(`users`, this.form)
                // console.log(res)
                const {
                    meta: { status, msg }
                } = res.data
                if (status === 201) {
                    // 1.提示添加成功
                    this.$message.success(msg)
                    // 3.更新视图
                    this.getUserList()
                    // 4.清空文本框
                    this.form = {}
                    // 上方等价于下方
                    // for(const key in this.form){
                    //     if(this.form.hasOwnProperty(key)){
                    //         this.form[key]=""
                    //     }
                    // }
                } else {
                    this.$message.error(msg)
                }
            },

            // 删除用户 - 打开消息盒子
            showDelUserMsgBox(userid) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    // 发送删除请求 :id-----用户id
                    // 1.data中找用户userid --不行
                    // 2.把userid以showDelUserMsgBox参数形式传进来 -- 可行
                    const res = await this.$http.delete(`users/${userid}`)
                    console.log(res)
                    if (res.data.meta.status === 200) {
                        this.pagenum = 1
                        // 更新视图
                        this.getUserList()
                        // 提示
                        this.$message({
                            type: 'success',
                            message: res.data.meta.msg
                        })
                    }

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 分页相关方法
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
                this.pagesize = val
                this.getUserList()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
                this.pagenum = val
                this.getUserList()
            },

            // 编辑用户 - 显示对话框
            showEditUserDia(user) {
                // 获取用户数据
                // console.log(user);
                this.form = user
                this.dialogFormVisibleEdit = true
            },
            // 编辑用户 - 发送请求
            async editUser() {
                this.dialogFormVisibleEdit = false
                const res = await this.$http.put(`users/${this.form.id}`, this.form)
                // console.log(res)
                // 1.关闭对话框
                this.dialogFormVisibleEdit = false
                // 2.更新视图
                this.getUserList()
                // 3.更新成功提示
                this.$message.success(res.data.meta.msg)
            },

            // 修改用户状态
            async changeMgState(user) {
                // 发送请求 users/:uId/state/:type
                const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
                // console.log(res);
            },

            // 分配角色 - 显示对话框
            async showSetUserRoleDia(user) {
                this.currUsername = user.username
                this.dialogFormVisibleRol = true

                // 给currUserId赋值
                this.currUserId = user.id

                // 获取所有的角色
                const res1 = await this.$http.get(`roles`)
                // console.log(res1)
                this.roles = res1.data.data
                // 获取当前用户角色id - rid
                const res = await this.$http.get(`users/${user.id}`)
                // console.log(res)
                this.currRoleId = res.data.data.rid
            },
            // 分配角色 - 发送请求
            async setRole() {
                // users/:id/role
                // :id 要修改的用户id值
                // 请求体中rid修改的新值角色id
                const res = await this.$http.put(`users/${this.currUserId}/role`, {
                    rid: this.currRoleId
                })
                console.log(res)
                // 关闭对话框
                this.dialogFormVisibleRol = false
            },

            // 获取用户列表的请求
            async getUserList() {
                // query 查询参数 可以为空
                // pagenum 当前页码 不能为空
                // pagesize 每页显示条数 不能为空

                // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
                // 设置请求头
                const AUTH_TOKEN = localStorage.getItem('token')
                this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

                const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
                // console.log(res)
                const {
                    meta: { status, msg },
                    data: { users, total }
                } = res.data
                if (status === 200) {
                    // 1.给表格数据赋值
                    this.userlist = users
                    // 2.给total赋值
                    this.total = total
                    // 3.获取数据成功提示
                    this.$message.success(msg)
                } else {
                    // 4.获取数据失败提示
                    this.$message.warning(msg)
                }
            }
        },
    }
</script>

<style>
    .box-card {
        height: 100%;
    }

    .searchRow {
        margin-top: 20px;
    }

    .inputSearch {
        width: 300px;
    }
</style>