import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// import user from './modules/user'
// import app from './modules/app'

const path = require('path')
const files = require.context('./modules', false, /\.js$/)
const modules = {}
files.keys().forEach(key => {
    const name = path.basename(key, '.js')
    modules[name] = files(key).default || files(key)
})
// const store = new Vuex.Store({
//     modules: {
//         user: user,
//         app: app,
//     },
// })
const store = new Vuex.Store({
    modules: modules,
})
export default store
