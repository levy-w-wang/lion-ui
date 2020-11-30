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
import role from '@/api/modules/role'
import quartz from '@/api/modules/quartz'
import quartzlog from '@/api/modules/quartzlog'

// 默认全部导出
export default {
    user,
    system,
    menu,
    role,
    quartz,
    quartzlog,
}