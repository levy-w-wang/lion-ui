/*
 * 接口统一集成模块
 */
// import * as user from '@/api/modules/user'
// import * as system from '@/api/modules/system'

// // 默认全部导出
// export default {
//     ...user,
//     ...system
// }
import user from '@/api/modules/user'
import system from '@/api/modules/system'
import menu from '@/api/modules/menu'

// 默认全部导出
export default {
    user,
    system,
    menu,
}