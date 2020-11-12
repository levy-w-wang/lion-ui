import axios from '@/api/axiosHttp'

const role = {
    /**
     * 获取角色一览
     * @param {*} params 
     */
    rolePage (params) {
        return axios.post('/api/role/page', params)
    },
    /**新增角色 */
    addRole (params) {
        return axios.post('/api/role/add', params)
    },
    /**修改角色 */
    modifuRole (params) {
        return axios.put('/api/role/modify', params)
    },
    /**删除角色 */
    removeRole (roleId) {
        return axios.delete(`/api/role/remove/${roleId}`)
    },
    /**获取角色按钮 */
    roleMenu (roleId) {
        return axios.get(`/api/role/menu/${roleId}`)
    },
    /**获取角色关联用户 */
    roleUser (roleId) {
        return axios.get(`/api/role/user/${roleId}`)
    },
    /**修改按钮角色关系 */
    roleMenuModify (params) {
        return axios.put('/api/role/menu/modify', params)
    },
    /**修改用户角色关系 */
    roleUserModify (params) {
        return axios.put('/api/role/user/modify', params)
    },
}
export default role;