import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import api from '@/api'
import bus from '@/Bus'
import '@/assets/styles/base.scss'
import PaginationFooter from '@/components/PaginationFooter'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import VueWechatTitle from 'vue-wechat-title'//动态修改title
Vue.use(VueWechatTitle)

Vue.component("pagination-footer", PaginationFooter);
Vue.config.productionTip = false
// Vue.prototype.$ELEMENT = { size: 'medium', zIndex: 3000 }

Vue.prototype.$api = api
Vue.prototype.$bus = bus

/**进度环显示隐藏 */
// NProgress.configure({ showSpinner: false });
// Vue.directive('title', {
//     //单个修改标题
//     inserted: function(el, binding) {
//         document.title = el.dataset.title
//     },
// })
// 需要改变标题的地方使用  v-title data-title="title"
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
