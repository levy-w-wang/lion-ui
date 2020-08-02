import router from '@/router'

export default {
    state: {
        userInfo: null, //用户信息
        token: null,
    },
    getters: {
        userInfo: (state) => {
            if (state.userInfo == null) {
                let sessionUser = sessionStorage.getItem('user')
                if (sessionUser != null) {
                    state.userInfo == JSON.parse(sessionUser)
                    return sessionUser
                } else {
                    let localeUser = localStorage.getItem('user')
                    if (localeUser != null) {
                        state.userInfo == JSON.parse(localeUser)
                    }
                    return localeUser
                }
            }
            return state.userInfo
        },
        token: (state) => {
            if (state.token == null) {
                let sessionToken = sessionStorage.getItem('token')
                if (sessionToken != null) {
                    state.token = sessionToken
                    return sessionToken
                } else {
                    let localeToken = localStorage.getItem('token')
                    state.token = localeToken
                    return localeToken
                }
            }
            return state.token
        },
    },
    mutations: {
        setToken(state, token, flag = true) {
            if (flag) {
                localStorage.setItem('token', token)
            } else {
                sessionStorage.setItem('token', token)
            }
        },
        setUserInfo(state, userInfo, flag = true) {
            state.userInfo = userInfo
            state.token = userInfo.token
            if (flag) {
                localStorage.setItem('user', JSON.stringify(userInfo))
            } else {
                sessionStorage.setItem('user', JSON.stringify(userInfo))
            }
            this.commit('setToken', userInfo.token, flag)
        },
        logout(state) {
            state.userInfo = null
            state.token = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('user')
            router.push('/login')
        },
    },
    actions: {},
}
