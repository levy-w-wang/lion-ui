import menu from '@/api/modules/menu'
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
        loadingTimer: null,/**请求异常 timer关闭 补漏 */
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
            if (!state.loading) {
                NProgress.start()/**请求进度条-开始 */
                state.loading = Loading.service({
                    lock: true,
                    fullscreen: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.5)'
                })
                state.timer = setTimeout(() => {
                    console.log(state);
                    if (state.loading) {
                        this.commit("endLoading")
                    }
                }, 8000)
            }
        },
        /**结束加载 */
        endLoading (state) {
            state.loadingCount--
            if (state.loadingCount <= 0) {
                state.loadingCount = 0
                if (state.timer) {
                    clearTimeout(state.timer)
                }
                if (state.loading) {
                    NProgress.done() /**请求进度条-结束 */
                    state.loading.close()
                    state.loading = false
                }
            }
        },
    },
    actions: {
        getMenuTree ({ commit }) {
            return new Promise((resolve, reject) => {
                menu.getMenutree()
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
