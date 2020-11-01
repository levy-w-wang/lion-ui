import axios from '@/api/axiosHttp'

const menu = {
    /**获取管理菜单 */
    getMenuManage () {
        return axios.Get('/api/menu/manage');
    },
    /**获取当前能访问的菜单 */
    getMenutree () {
        return axios.Get('/api/menu/menutree');
    },
    /**添加菜单 */
    addmenu (params) {
        return axios.Post('​/api​/menu​/menu', params)
    },
}
export default menu;
