<template>
    <el-card>
        <!-- 1.面包屑 -->
        <my-bread level1="商品管理" level2="分类参数"></my-bread>

        <!-- 2.提示 -->
        <el-alert title="只允许为第三级分类设置参数" type="warning" :closable="false" style="margin-top: 20px;"></el-alert>

        <!-- 3.级联选择器 -->
        <el-form label-position="left" label-width="80px" style="margin-top: 20px;">
            <el-form-item label="商品分类">
                <el-cascader clearable :options="options" v-model="selectedOptions" :props="defaultProp"
                    @change="handleChange" :show-all-levels="false">
                </el-cascader>
            </el-form-item>

        </el-form>
        <el-tabs v-model="active" type="card" @tab-click="handleClick">
            <el-tab-pane label="动态参数" name="1">
                <!-- 按钮 -->
                <el-button type="success">设置动态参数</el-button>

                <!-- 表格 -->
                <el-table :data="arrDyparams" style="width: 100%">
                    <!-- # -->
                    <el-table-column type="expand" label="#">
                        <template slot-scope="scope">
                            <el-tag :key="tag" v-for="tag in scope.row.attr_vals" closable :disable-transitions="false"
                                @close="handleClose(scope.row.attr_vals,scope.row.attr_id,scope.row.attr_name,tag)">
                                {{tag}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm(scope.row.attr_vals,scope.row.attr_id,scope.row.attr_name)"
                                @blur="handleInputConfirm(scope.row.attr_vals,scope.row.attr_id,scope.row.attr_name)">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag
                            </el-button>
                        </template>
                    </el-table-column>
                    <!-- 属性名称 -->
                    <el-table-column label="属性名称" prop="attr_name">
                    </el-table-column>
                    <!-- 操作 -->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="showEditUserDia(scope.row)" size="mini" plain type="primary"
                                icon="el-icon-edit" circle>
                            </el-button>
                            <el-button @click="showDelUserMsgBox(scope.row.id)" size="mini" plain type="danger"
                                icon="el-icon-delete" circle></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态参数" name="2">
                <!-- 按钮 -->
                <el-button type="success">设置静态参数</el-button>

                <!-- 表格 -->
                <el-table :data="arrStaticparams" style="width: 100%">
                    <!-- # -->
                    <el-table-column type="index" label="#">
                    </el-table-column>
                    <!-- 属性名称 -->
                    <el-table-column label="属性名称" prop="attr_name">
                    </el-table-column>
                    <!-- 属性值 -->
                    <el-table-column label="属性值" prop="attr_vals">
                    </el-table-column>
                    <!-- 操作 -->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="showEditUserDia(scope.row)" size="mini" plain type="primary"
                                icon="el-icon-edit" circle>
                            </el-button>
                            <el-button @click="showDelUserMsgBox(scope.row.id)" size="mini" plain type="danger"
                                icon="el-icon-delete" circle></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
    export default {
        name: 'CateParams',
        data() {
            return {
                // 级联选择器绑定的数据
                options: [],
                //级联选择器默认展示
                selectedOptions: [],
                //defaultProp把数据转换成options中需要的值
                defaultProp: {
                    expandtrigger: "hover",
                    label: 'cat_name',
                    value: 'cat_id',
                    children: 'children'
                },
                arrDyparams: [],
                active: '1',
                list: [],
                inputVisible: false,
                inputValue: '',
                arrStaticparams: []
            }
        },
        created() {
            this.getGoodCate()
        },
        methods: {
            // 点击 X 按钮
            async handleClose(attr_vals, attr_id, attr_name, tag) {
                attr_vals.splice(attr_vals.indexOf(tag), 1);
                // 发送请求 categories/:id/attributes/:attrId
                // put请求体 { attr_name:?,attr_sel:?,attr_vals:? }
                // :id分类 ID不能为空 `携带在url中`
                // :attrId属性 ID不能为空 `携带在url中`
                // attr_name 参数名称 不能为空
                // attr_sel [only,many] 不能为空
                // attr_vals 如果是 many 就需要填写值的选项，以逗号分隔
                let putData = {
                    attr_name: attr_name,
                    attr_sel: 'many',
                    attr_vals: attr_vals.join(',')
                }
                const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${attr_id}`, putData)
                // console.log(res);
            },
            //   点击newTag按钮
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            // 回车键 or 失去焦点
            async handleInputConfirm(attr_vals, attr_id, attr_name) {
                let inputValue = this.inputValue;
                if (inputValue) {
                    attr_vals.push(inputValue);
                    // 发送请求
                    let putData = {
                        attr_name: attr_name,
                        attr_sel: 'many',
                        attr_vals: attr_vals.join(',')
                    }
                    const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${attr_id}`, putData)
                    console.log(res);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            // tab切换时触发
            async handleClick() {
                if (this.active === '2') {
                    if (this.selectedOptions.length === 3) {
                        // 获取静态参数数据
                        //id->分类 sel=only表示的是获取静态参数的数据
                        const res = await this.$http.get('categories/' + this.selectedOptions[2] + '/attributes?sel=only');
                        //console.log(res);
                        this.arrStaticparams = res.data.data;
                        //console.log(this.arrStaticparams);
                    }
                }
            },
            // 级联选择器改变时触发
            async handleChange() {
                if (this.selectedOptions.length === 3) {
                    // 获取动态参数
                    //id->分类 sel=many表示的是获取动态参数的数据
                    const res = await this.$http.get('categories/' + this.selectedOptions[2] + '/attributes?sel=many')
                    //console.log(res)
                    this.arrDyparams = res.data.data
                    // console.log(this.arrDyparams)
                    //this.arrDyparams每个对象.attr_vals字符串->数组->v-for
                    this.arrDyparams.forEach(item => {
                        //item.attr_vals里的值为字符串，需要转成对象在遍历，trim()去前后空格，split(',')转换成对象以“，”分割
                        item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(',')
                    });
                }
            },
            // 获取三级分类数据
            async getGoodCate() {
                const res = await this.$http.get(`categories?type=3`);
                //console.log(res);
                this.options = res.data.data;
                //console.log(this.options);
            }
        },
    }
</script>

<style>
    .el-tag+.el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>