const baseUrl = process.env.VUE_APP_BASE_RUL
export default {
    method: 'get',
    // 基础url前缀
    baseURL: baseUrl,
    // 请求头信息
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    // 参数
    data: {},
    // 设置超时时间
    timeout: 8000,
    // 返回数据类型
    responseType: 'json',
    noneLoadingList: ['api/menu', 'api/usermenu']
}
