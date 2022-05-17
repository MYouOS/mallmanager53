<template>
    <div>
        <el-card>
            <my-bread level1="权限管理" level2="角色列表"></my-bread>
            <el-row>
                <el-col class="addrolebtn">
                    <el-button type="primary">添加角色</el-button>
                </el-col>
            </el-row>

            <!-- 表格 -->
            <el-table :data="rolelist" style="width: 100%">
                <!-- 下拉列表 -->
                <el-table-column type="expand" width="60">
                    <template slot-scope="scope">
                        <el-row v-for="(item1, i) in scope.row.children" :key="i">
                            <el-col :span="4" class="tableTagCol">
                                <!-- deleRight() 传角色id和权限id -->
                                <el-tag @close="deleRight(scope.row,item1.id)" closable>{{item1.authName}}</el-tag>
                                &nbsp;
                                <i class="el-icon-arrow-right"></i>
                            </el-col>
                            <el-col :span="20" class="tableTagCol">
                                <el-row v-for="(item2, i) in item1.children" :key="i">
                                    <el-col :span="4">
                                        <el-tag @close="deleRight(scope.row,item2.id)" type="success" closable>
                                            {{item2.authName}}</el-tag>
                                        &nbsp;
                                        <i class="el-icon-arrow-right"></i>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-tag @close="deleRight(scope.row,item3.id)"
                                            v-for="(item3, i) in item2.children" :key="i" type="warning" closable>
                                            {{item3.authName}}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>

                        <!-- 无权限提示 -->
                        <span v-if="scope.row.children.length===0">未分配权限</span>
                    </template>
                </el-table-column>

                <el-table-column type="index" label="#" width="60">
                </el-table-column>
                <el-table-column prop="roleName" label="角色名称">
                </el-table-column>
                <el-table-column prop="roleDesc" label="角色描述">
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showEditUserDia(scope.row)" size="mini" plain type="primary"
                            icon="el-icon-edit" circle>
                        </el-button>
                        <el-button @click="showDelUserMsgBox(scope.row.id)" size="mini" plain type="danger"
                            icon="el-icon-delete" circle></el-button>
                        <el-button @click="showRightDia(scope.row)" size="mini" plain type="success"
                            icon="el-icon-check" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 对话框 -->
            <!-- 修改权限 -->
            <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
                <!-- 树型结构
                    data - 数据源
                    show-checkbox - 选择框[]
                    node-key -  每个节点的唯一标识，通常是data数据源中key名id
                    default-expanded-keys - 默认展开 [要展开的节点的id]
                    default-checked-keys - 默认展开 [要选择的节点的id]
                    props - 配置项{label，children} label - 节点的文字标题；children - 节点的子节点
                    值都来源于data绑定的数据源中的该数据的key名 'label'和'children'
                -->
                <el-tree :data="treeList" show-checkbox node-key="id" default-expand-all
                    :default-checked-keys="arrcheck" :props="defaultProps" ref="tree">
                </el-tree>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
                    <el-button type="primary" @click="setRoleRight()">确 定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'RoleName',
        data() {
            return {
                rolelist: [],
                dialogFormVisibleRight: false,
                // 树形结构的数据
                treeList: [],
                defaultProps: {
                    label: 'authName',
                    children: 'children'
                },
                arrexpand: [],
                arrcheck: [],
                currRoleId: -1
            }
        },
        created() {
            this.getRolelist()
        },
        methods: {
            async getRolelist() {

                // 除了登录之外的所有请求，都需要设置头部
                const res = await this.$http.get(`roles`)
                // console.log(res)
                this.rolelist = res.data.data
            },
            // 取消权限
            async deleRight(role, rightId) {
                // roles/:roleId/rights/:rightId
                // roleId：当前角色的id  rightId：权限id
                const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
                // console.log(res)
                // 删除成功 返回了200和该角色的剩余权限
                role.children = res.data.data
                this.getRolelist()
            },
            // 修改/分配权限 - 打开对话框
            async showRightDia(role) {
                // 给currRoleId赋值
                this.currRoleId = role.id

                // 获取树形结构的权限数据 rights/:type
                const res = await this.$http.get(`rights/tree`)
                // console.log(res);
                this.treeList = res.data.data
                // default-expand-all属性 可以替代下面的代码
                // var arrtemp1 = []
                // this.treeList.forEach(item1 => {
                //     arrtemp1.push(item1.id)
                //     item1.children.forEach(item2 => {
                //         arrtemp1.push(item2.id)
                //         item2.children.forEach(item3 => {
                //             arrtemp1.push(item3.id)
                //         });
                //     });
                // });
                // console.log(arrtemp1)
                // this.arrexpand = arrtemp1

                // 获取当前角色role的权限id
                let arrtemp2 = []
                role.children.forEach(item1 => {
                    // arrtemp2.push(item1.id)
                    item1.children.forEach(item2 => {
                        // arrtemp2.push(item2.id)
                        item2.children.forEach(item3 => {
                            arrtemp2.push(item3.id)
                        });
                    });
                });
                console.log(arrtemp2);
                this.arrcheck = arrtemp2

                this.dialogFormVisibleRight = true
            },

            // 修改/分配权限 - 发生请求
            async setRoleRight() {
                // roles/:roleId/rights
                // roleId - 当前要修改权限的角色id
                // rids - 树形节点中，所有全选和半选的label的id[]
                // 获取全选的id的数组arr1 getCheckedKeys()
                let arr1 = this.$refs.tree.getCheckedKeys()
                // 获取半选的id的数组arr2 getHalfCheckedKeys()
                let arr2 = this.$refs.tree.getHalfCheckedKeys()
                // arr=arr1+arr2 ES6 展开运算符 ...数组或对象
                let arr = [...arr1, ...arr2]
                const res = await this.$http.post(`roles/${this.currRoleId}/rights`, { rids: arr.join(',') })
                // console.log(res)

                // 更新视图
                this.getRolelist()

                this.dialogFormVisibleRight = false
            }
        },
    }
</script>

<style>
    .addrolebtn {
        margin-top: 20px;
    }

    .tableTagCol {
        padding-top: 20px;
    }
</style>

<!-- 布局时行列布局 -> for嵌套 
        v-for嵌套 渲染el-tag
-->