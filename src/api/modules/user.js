import axios from '@/api/axiosHttp'

// export const login = (params) => {
//     return axios.Post('/login', params)
// }

const user = {
    login (params) {
        return axios.Post('/api/user/login', params)
    },
    logout () {
        return axios.Post('/api/user/logout')
    },
}

export default user;
