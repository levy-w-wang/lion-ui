import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home'),
    },
    {
        path: '/login',
        name: 'login',
        component: login,
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('@/views/notfound'),
    },
    {
        path: '*',
        redirect: '/notfound',
        name: 'notfound',
        component: () => import('@/views/notfound'),
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
    var hasAuth = user && token
    if (to.path == '/login') {
        if (hasAuth) {
            next({ path: '/' })
        } else {
            next()
        }
    } else {
        if (!hasAuth) {
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
