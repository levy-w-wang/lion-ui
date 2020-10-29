import axios from '@/api/axiosHttp'

// export const login = (params) => {
//     return axios.Post('/login', params)
// }

const user = {
    /**登录 */
    login (params) {
        return axios.Post('/api/user/login', params)
    },
    /**登出 */
    logout () {
        return axios.Post('/api/user/logout')
    },
    /**获取注册验证码 */
    registercaptcha (params) {
        return axios.Get('/api/user/registercaptcha', params)
    },
    /**注册用户 */
    register (params) {
        return axios.Post('/api/user/register', params)
    },
    /**是否存在 */
    exist (params) {
        return axios.Get('/api/user/exist', params)
    },
    /**修改密码 */
    modifypwd (params) {
        return axios.Put('/api/user/modifypwd', params)
    },
    /**发送找回密码验证码  body需email参数  json格式 */
    sendemailrestpwd (params) {
        return axios.Post('/api/user/send-email-reset-pwd', params)
    },
    /**找回密码 */
    retrievepwd (params) {
        return axios.Post('/api/user/retrievepwd', params)
    },

}

export default user;
