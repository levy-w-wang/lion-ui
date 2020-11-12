import axios from '@/api/axiosHttp'

// export const getCaptcha = () => {
//     return axios.Get('/api/system/captcha');
// }
const system = {
    /**获取验证码 */
    getCaptcha () {
        return axios.get('/api/system/captcha');
    },
}
export default system;
