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
        return axios.Post('/api/menu/menu', params)
    },
    /**删除菜单_需先删除子菜单 */
    deleteMenu (menuId) {
        return axios.Delete(`/api/menu/menu/${menuId}`)
    },
    /**分配或取消分配非系统管理员权限 */
    assignMenu (params) {
        return axios.Post('/api/menu/assign', params)
    },
}
export default menu;
