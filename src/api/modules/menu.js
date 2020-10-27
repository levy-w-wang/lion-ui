import axios from '@/api/axiosHttp'

const menu = {
    getMenutree () {
        return axios.Get('/api/menu/menutree');
    },
}
export default menu;
