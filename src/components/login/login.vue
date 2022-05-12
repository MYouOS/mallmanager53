<template>
    <div class="login-wrap">
        <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
            <h2>用户登录</h2>
            <el-form-item label="用户名">
                <el-input v-model="formdata.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formdata.password"></el-input>
            </el-form-item>
            <el-button @click.prevent="handleLogin()" class="login-btn" type="primary">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'LoginName',
        data() {
            return {
                formdata: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            // 登录请求
            async handleLogin() {
                // ES7 async+wait
                // 1.找到异步操作有结果的代码，前面加await 同时接口异步操作的结果res
                // 2.找到距离异步操作有结果的代码最近的方法，前面加async
                const res = await this.$http.post('login', this.formdata)
                const {
                    data,
                    meta: { msg, status }
                } = res.data


                if (status === 200) {
                    this.$message.success(msg);
                    this.$router.push({ name: 'home' })

                } else {
                    this.$message.error(msg);
                }

                // this.$http.post('login', this.formdata).then((res) => {
                //     // console.log(res)
                //     // 对象解构赋值
                //     const {
                //         data,
                //         meta: { msg, status }
                //     } = res.data


                //     if (status === 200) {
                //         // 登录成功
                //         // 1.提示成功
                //         this.$message.success(msg);
                //         // 2.跳转home
                //         this.$router.push({ name: 'home' })

                //     } else {
                //         // 登录失败
                //         // 1.提示失败
                //         this.$message.error(msg);
                //     }

                // })
            }
        },
    }
</script>

<style>
    .login-wrap {
        height: 100%;
        background-color: #324152;
        /* 弹性盒布局 */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-wrap .login-form {
        width: 400px;
        background-color: #fff;
        border-radius: 5px;
        padding: 30px;
    }

    .login-wrap .login-btn {
        width: 100%;
    }
</style>