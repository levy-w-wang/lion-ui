import { getMenu } from '@/api/modules/system'
import NProgress from 'nprogress'
import { Loading } from 'element-ui'

export default {
    state: {
        // 是否折叠导航栏
        isCollapse: false,
        // 访问页集合
        mainTabs: [],
        // 当前访问页名
        mainTabsActiveName: '',
        themeColor: '#545c64',
        menuTree: [],
        menuLoad: false, //菜单是否已加载状态避免重复加载，刷新又将变为false。
        loading: false,/**加载状态 */
        loadingCount: 0,/**加载个数 */
    },
    getters: {
        isCollapse: (state) => {
            return state.isCollapse
        },
        menuLoad: (state) => {
            return state.menuLoad
        },
    },
    mutations: {
        toggleCollapse (state) {
            state.isCollapse = !state.isCollapse
        },
        updateMainTabs (state, tabs) {
            state.mainTabs = tabs
        },
        updateMainTabsActiveName (state, name) {
            state.mainTabsActiveName = name
        },
        setThemeColor (state, themeColor) {
            state.themeColor = themeColor
        },

        setMenuLoad (state, menuLoad) {
            state.menuLoad = menuLoad
        },
        setMenuTree (state, menuTree) {
            state.menuTree = menuTree
        },
        resetMenu (state) {
            // 这样重置依赖于个人管理， 因此在退出时做全局刷新
            state.menuTree = []
            state.mainTabs = []
            state.menuLoad = false
            state.isCollapse = false
            state.mainTabsActiveName = ''
            state.themeColor = '#545c64'
        },
        /**开始加载 */
        startLoading (state) {
            state.loadingCount++
            if (!this.loading) {
                NProgress.start()/**请求进度条-开始 */
                this.loading = Loading.service({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.8)'
                })
            }
        },
        /**结束加载 */
        endLoading (state) {
            state.loadingCount--
            if (state.loadingCount <= 0) {
                state.loadingCount = 0
                if (this.loading) {
                    NProgress.done() /**请求进度条-结束 */
                    this.loading.close()
                    this.loading = false
                }
            }
        },
    },
    actions: {
        // haveArg({ commit }, arg) {
        //     return new Promise((resolve, reject) => {
        //       func(arg)
        //         .then(res => {
        //           if (res.code === 0) {
        //             if (res.data.success) {
        //               commit('xxx', res.data.xxx)
        //             } else {
        //              xxx
        //             }
        //             resolve(res)
        //           }
        //         })
        //         .catch(error => {
        //           reject(error)
        //         })
        //     })
        //   },
        getMenuTree ({ commit }, username) {
            return new Promise((resolve, reject) => {
                getMenu(username)
                    .then((res) => {
                        if (res.code === 200) {
                            if (res.success) {
                                commit('setMenuTree', res.data)
                            } else {
                                // TODO 处理错误消息
                            }
                            resolve(res.data)
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
    },
}
