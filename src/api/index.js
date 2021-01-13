/*
 * 接口统一集成模块
 */

const path = require('path')
const files = require.context('@/api/modules', false, /\.js$/)
const modules = {}
files.keys().forEach(key => {
    const name = path.basename(key, '.js')
    modules[name] = files(key).default || files(key)
})
export default modules

// import user from '@/api/modules/user'
// import system from '@/api/modules/system'
// import menu from '@/api/modules/menu'
// import role from '@/api/modules/role'
// import quartz from '@/api/modules/quartz'
// import quartzlog from '@/api/modules/quartzlog'

// // 默认全部导出
// export default {
//     user,
//     system,
//     menu,
//     role,
//     quartz,
//     quartzlog,
// }