import axios from '@/api/axiosHttp'

const quartzlog = {
    /** 任务分页数据 */
    taskLogList (params) {
        return axios.post('/api/quartzlog/list', params)
    },

}
export default quartzlog;