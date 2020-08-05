export default {
    state: {
        // 是否折叠导航栏
        isCollapse: false,
        // 访问页集合
        mainTabs: [],
        // 当前访问页名
        mainTabsActiveName: '',
    },
    getters: {
        isCollapse: (state) => {
            return state.isCollapse
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
    },
    actions: {},
}
