import { getMenu } from '@/api/modules/system'

export default {
    state: {
        // 是否折叠导航栏
        isCollapse: false,
        // 访问页集合
        mainTabs: [],
        // 当前访问页名
        mainTabsActiveName: '',
        themeColor: '#5d82a0',
        menuTree: [],
        menuLoad: false,//菜单是否已加载状态避免重复加载，刷新又将变为false。
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
            state.themeColor = themeColor;
        },

        setMenuLoad (state, menuLoad) {
            state.menuLoad = menuLoad;
        },
        setMenuTree (state, menuTree) {
            state.menuTree = menuTree;
        },
        resetMenu (state) {
            state.menuTree = [];
            state.menuLoad = false
            state.isCollapse = false
            state.mainTabsActiveName = ''
            state.themeColor = '#5d82a0'
        }
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
                getMenu(username).then(res => {
                    if (res.code === 200) {
                        if (res.success) {
                            commit('setMenuTree', res.data)
                        } else {
                            // TODO 处理错误消息
                        }
                        resolve(res.data)
                    }
                })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },
}
