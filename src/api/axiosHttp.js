import axios from 'axios'
import qs from 'qs'
import store from "@/store/index";
import router from '@/router'
import apiConfig from './config'
import { Message } from 'element-ui'

axios.defaults.timeout = apiConfig.timeout
axios.defaults.headers = apiConfig.headers
axios.defaults.baseURL = apiConfig.baseURL

// 请求拦截器
axios.interceptors.request.use(
    (config) => {
        var length = config.url.indexOf('?') == -1 ? config.url.length : config.url.indexOf('?');
        if (!apiConfig.noneLoadingList.includes(config.url.substring(0, length))) {
            store.commit("startLoading");
        }
        // 触发loading效果
        //判断是否存在token,如果存在，则在header上加上token
        let token = store.getters.token
        if (token) {
            config.headers.token = token
        }
        if (config.method == 'post' || config.method == 'put') {
            //将数据转成string
            config.data = JSON.stringify(config.data)
        } else if (config.method == 'get') {
            //&& browser.isIE
            //给Get添加时间戳 解决IE缓存问题
            let symbol = config.url.indexOf('?') >= 0 ? '&' : '?'
            config.url += symbol + '_=' + Date.now()
            config.data = qs.stringify(config.data)
        }
        return config
    },
    (err) => {
        // 失败提示
        return Promise.resolve(err)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        var requestUrl = response.config.url;
        var length = requestUrl.indexOf('?') == -1 ? requestUrl.length : requestUrl.indexOf('?');
        if (!apiConfig.noneLoadingList.includes(requestUrl.substring(0, length))) {
            store.commit("endLoading");
        }
        // 关闭loading
        if (!response || !response.data || !response.data.success) {
            // 失败提示
        } else if (response.data.data && response.data.code == 200) {
            // 成功处理
        }
        if (response.data) {
            switch (response.data.code) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    // store.commit('LOGOUT')
                    Message.error('登录已失效，请重新登录')

                    setTimeout(function () {
                        // router.replace({
                        //     path: '/login',
                        //     // 登录成功后跳入浏览的当前页面
                        //     query: { redirect: router.currentRoute.fullPath },
                        // })
                        store.commit("logout", router.currentRoute.fullPath)
                    }, 1500)
                    break
                case 402:
                    //402无权限操作
                    Message.error('无权限操作')
                    return new Promise(() => { }) //外部不会再处理
                    break
                case 200:
                    if (response.headers['token']) {
                        store.commit('setToken', response.headers['token'])
                    }
                    break;
            }
        }
        return response.data
    },
    (err) => {
        console.log(err);
        console.log(err.message);
        console.log(err.response);
        // 关闭loading
        // 提示异常
        let errMessage = '系统错误，请稍后再试'
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    errMessage = '请求错误'
                    break
                case 401:
                    errMessage = '未授权，请登录'
                    break
                case 403:
                    errMessage = '拒绝访问'
                    break
                case 404:
                    errMessage = `请求发生错误`
                    // err.response.config.url
                    break
                case 408:
                    errMessage = '请求超时'
                    break
                case 500:
                    errMessage = '服务器内部错误'
                    break
                case 501:
                    errMessage = '服务未实现'
                    break
                case 502:
                    errMessage = '网关错误'
                    break
                case 503:
                    errMessage = '服务不可用'
                    break
                case 504:
                    errMessage = '网关超时'
                    break
                case 505:
                    errMessage = 'HTTP版本不受支持'
                    break
                default:
                    errMessage = '服务器开小差了，请稍后再试'
            }
        }
        Message.error(errMessage)
        //外部不会再处理
        return new Promise(() => { })
    }
)
export default {
    Get (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios
                .get(url, { params })
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                    //resolve(error)
                })
        })
    },
    Post (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios
                .post(url, params)
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                    //resolve(error)
                })
        })
    },
    Delete (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios
                .delete(url, params)
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                    //resolve(error)
                })
        })
    },
    Put (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios
                .put(url, params)
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                    //resolve(error)
                })
        })
    },
}
