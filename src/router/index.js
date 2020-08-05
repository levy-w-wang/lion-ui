import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import store from '@/store'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch((err) => err)
}
const routes = [
    {
        path: '/',
        name: 'home',
        // component: () => import('@/views/home'),
        component: () => import('@/layout'),
        children: [
            {
                path: '',
                name: 'index',
                component: () => import('@/views/home/defaultPage'),
                meta: {
                    title: '首页'
                }
            },
            {
                path: 'menumanage',
                name: 'menumanage',
                component: () => import('@/views/home/systemManage/menuManage'),
                meta: {
                    title: '菜单管理'
                }
            },
            {
                path: 'usermanage',
                name: 'usermanage',
                component: () => import('@/views/home/systemManage/userManage'),
                meta: {
                    title: '用户管理'
                }
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('@/views/notfound'),
        meta: {
            title: '未找到'
        }
    },
    {
        path: '*',
        redirect: '/notfound',
        name: 'notfound',
        component: () => import('@/views/notfound'),
        meta: {
            title: '未找到'
        }
    },
]

const router = new VueRouter({
    routes,
})
const WhiteListRouter = ['/login', '/notfound'] // 路由白名单
//导航守卫  路由开始前
router.beforeEach((to, from, next) => {
    let user = store.getters.userInfo
    let token = store.getters.token
    var hasAuth = user !== null && token !== null && user !== undefined && token !== undefined
    if (to.path == '/login') {
        if (hasAuth) {
            next({ path: '/' })
        } else {
            next()
        }
    } else {
        if (!hasAuth) {
            //没登录的情况下  访问的是否是白名单
            if (WhiteListRouter.indexOf(to.path) !== -1) {
                next()
            } else {
                next({
                    path: '/login',
                })
            }
        } else {
            next()
        }
    }
})

export default router
