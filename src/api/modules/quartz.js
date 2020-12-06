import axios from '@/api/axiosHttp'

const quartz = {
    /** 任务分页数据 */
    taskList (params) {
        return axios.post('/api/quartz/list', params)
    },
    /** 添加任务 */
    addtask (params) {
        return axios.post('/api/quartz/addtask', params)
    },
    /** 暂停任务 */
    stopJob (params) {
        return axios.put('/api/quartz/stopjob', params)
    },
    /** 删除任务 */
    removeJob (params) {
        return axios.delete('/api/quartz/removejob', { data: params })
    },
    /** 恢复任务 */
    resumeJob (params) {
        return axios.put('/api/quartz/resumejob', params)
    },
    /** 修改任务 */
    modifyJob (params) {
        return axios.put('/api/quartz/modifyjob', params)
    },
    /** 开始调度 */
    startSchedule () {
        return axios.put('/api/quartz/startschedule')
    },
    /** 暂停调度器 */
    stopSchedule () {
        return axios.put('/api/quartz/stopschedule')
    },
    /** 获取调度器状态 */
    getScheduleState () {
        return axios.get('/api/quartz/schedulestate')
    },
}
export default quartz;