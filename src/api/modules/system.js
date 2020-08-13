import axios from '@/api/axiosHttp'

export const getMenu = (username) => {
    if (username == 'user') {
        return axios.Get('api/usermenu')
    }
    else {
        return axios.Get('api/menu')
    }
}