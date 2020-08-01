import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import api from '@/api'

Vue.config.productionTip = false
// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

Vue.prototype.$api = api

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
