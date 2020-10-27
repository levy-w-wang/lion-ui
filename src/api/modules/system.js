import axios from '@/api/axiosHttp'

// export const getCaptcha = () => {
//     return axios.Get('/api/system/captcha');
// }
const system = {
    getCaptcha () {
        return axios.Get('/api/system/captcha');
    },
}
export default system;
