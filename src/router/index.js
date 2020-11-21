import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import register from '@/views/other/register'
import retrievepwd from '@/views/other/retrievepwd'
import store from '@/store'
import NProgress from 'nprogress'

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
                    title: '首页',
                    index: 0
                }
            },
            // {
            //     path: 'menumanage',
            //     name: 'menumanage',
            //     component: () => import('@/views/home/systemManage/menuManage'),
            //     meta: {
            //         title: '菜单管理'
            //     }
            // },
            // {
            //     path: 'usermanage',
            //     name: 'usermanage',
            //     component: () => import('@/views/home/systemManage/userManage'),
            //     meta: {
            //         title: '用户管理'
            //     }
            // },
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
        path: '/register',
        name: 'register',
        component: register,
        meta: {
            title: "注册"
        }
    },
    {
        path: '/retrievepwd',
        name: 'retrievepwd',
        component: retrievepwd,
        meta: {
            title: '找回密码'
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
    // {
    //     path: '*',
    //     redirect: '/notfound',
    //     name: 'notfound',
    //     component: () => import('@/views/notfound'),
    //     meta: {
    //         title: '未找到'
    //     }
    // },
]

// const router = new VueRouter({
//     routes,
// })

const defultRouter = () => {
    return new VueRouter({
        routes: routes
    })
}
//每次使用默认路由
const router = defultRouter()

// 解决addRoute不能删除动态路由问题
export function resetRouter () {
    const reset = defultRouter()
    router.matcher = reset.matcher
}
/**路由后 */
router.afterEach(() => {
    NProgress.done()/**请求进度条-结束 */
})
const WhiteListRouter = ['/login', '/notfound', '/register', '/retrievepwd'] // 路由白名单
//导航守卫  路由开始前
router.beforeEach(async (to, from, next) => {
    NProgress.start()/**请求进度条-开始 */
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
        let routerIndex = WhiteListRouter.indexOf(to.path);
        if (!hasAuth) {
            //没登录的情况下  访问的是否是白名单
            if (routerIndex !== -1) {
                next()
            } else {
                // 当没登录直接打开网址时  未找到地址且不是白名单时，将直接跳转到登录页面
                console.log(to.path.slice(1));
                if (to.path.slice(1) !== '') {
                    if (to.matched.length === 0) {
                        router.push({
                            path: '/login'
                        })
                    } else {
                        router.push({
                            path: '/login',
                            query: {
                                redirect: to.path.slice(1)
                            }
                        })
                    }
                } else {
                    router.push({
                        path: '/login'
                    })
                }
            }
        }
        else {
            if (store.state.app.menuLoad || routerIndex !== -1) {
                // 已经加载过路由了
                next();
                return;
            } else {
                const menu = await store.dispatch('getMenuTree')
                console.log(menu);
                // 加载动态菜单和路由
                addDynamicMenuRoute(menu);
                //next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next()
            }
        }
    }
})

//刷新加载完后加载未找到
router.onReady(() => {
    var notfund = [
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
    router.options.routes = router.options.routes.concat(
        notfund
    );
    router.addRoutes(router.options.routes);
})

/**
 * 加载动态菜单和路由
 */
function addDynamicMenuRoute (menuData) {
    if (store.state.app.menuRouteLoaded) {
        console.log('已加载菜单和路由.')
        return
    }
    let dynamicRoutes = addDynamicRoutes(menuData);
    // 处理静态组件绑定路由
    router.options.routes[0].children = router.options.routes[0].children.concat(
        dynamicRoutes
    );

    router.addRoutes(router.options.routes);

    // 保存加载状态
    store.commit("setMenuLoad", true);
}
/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function addDynamicRoutes (menuList = [], routes = []) {
    var temp = [];
    for (var i = 0; i < menuList.length; i++) {
        if (menuList[i].childMenus && menuList[i].childMenus.length >= 1) {
            temp = temp.concat(menuList[i].childMenus);
        } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
            //将第一个斜杠去掉
            menuList[i].url = menuList[i].url.replace(/^\//, "");
            // 创建路由配置
            var route = {
                path: menuList[i].url,
                component: null,
                name: menuList[i].menuName,
                meta: {
                    title: menuList[i].menuName,
                    icon: menuList[i].icon,
                    index: menuList[i].menuId,
                    perms: menuList[i].buttonPerms.map(obj => { return obj.url })
                }
            };
            try {
                // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
                // 如url="menu/singleMenu/index"，则组件路径应是"@/views/menu/singleMenu/index".vue",否则将找不到改组件
                let url = menuList[i].url;
                route["component"] = resolve => require([`@/views/${url}`], resolve);
            } catch (e) { }

            routes.push(route);
        }
    }
    if (temp.length >= 1) {
        addDynamicRoutes(temp, routes);
    }
    return routes;
}

export default router
