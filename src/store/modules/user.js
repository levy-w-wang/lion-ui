export default {
    state: {
        userInfo: null, //用户信息
    },
    getters: {
        userInfo: (state) => {
            if (state.userInfo == null) {
                let sessionUser = sessionStorage.getItem('user')
                if (sessionUser != null) {
                    state.userInfo == sessionUser
                    return sessionUser
                } else {
                    let localeUser = localStorage.getItem('user')
                    if (localeUser != null) {
                        state.userInfo == localeUser
                    }
                    return localeUser
                }
            }
            return state.userInfo
        },
        token: (state) => {
            let sessionToken = sessionStorage.getItem('token')
            if (sessionToken != null) {
                return sessionToken
            } else {
                let localeToken = localStorage.getItem('token')
                return localeToken
            }
        },
    },
    mutations: {
        setUserInfo(state, userInfo, flag = true) {
            console.log(userInfo)
            // 用户权限标识集合
            state.userInfo = userInfo
            if (flag) {
                localStorage.setItem('user', userInfo)
            } else {
                sessionStorage.setItem('user', userInfo)
            }
            this.commit('setToken', userInfo.token ?? null, flag)
        },
        setToken(state, token, flag = true) {
            if (flag) {
                localStorage.setItem('token', token)
            } else {
                sessionStorage.setItem('token', token)
            }
        },
    },
    actions: {},
}
