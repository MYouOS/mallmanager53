// 插件模块
import axios from 'axios'
const MyHttpServer = {}

MyHttpServer.install = function (Vue) {

    axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"

    // 添加请求拦截器
    // 在请求发起之前会自动来到下面的回调函数
    axios.interceptors.request.use(function (config) {
        console.log("拦截器被触发");
        console.log(config);
        if (config.url !== 'login') {
            // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
            // 设置请求头
            const AUTH_TOKEN = localStorage.getItem('token')
            config.headers['Authorization'] = AUTH_TOKEN
        }
        // 在发生请求之前做些什么
        return config
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    })

    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response;
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });

    // 添加实例方法
    Vue.prototype.$http = axios

}

export default MyHttpServer