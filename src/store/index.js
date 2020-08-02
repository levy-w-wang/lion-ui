import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'

const store = new Vuex.Store({
    modules: {
        user: user,
    },
})
export default store
