import axios from '@/api/axiosHttp'

export const login = (params) => {
    return axios.Post('/login', params)
}

export const test = () => {
    return axios.Get('/test')
}
