import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'
import app from './modules/app'

const store = new Vuex.Store({
    modules: {
        user: user,
        app: app,
    },
})
export default store
