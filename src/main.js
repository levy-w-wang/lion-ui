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

/**按钮是否显示 */
Vue.directive('perms', {
    inserted (el, binding, vnode) {
        const { value } = binding // 取出指令的值，指的是v-perms="'新增'"中的 新增 这个值 
        const perms = store.getters && store.getters.mainPerms // 从store中取出储存好的后端给的按钮权限 
        if (value && value.length > 0) { // 判断value是否有值，类型是否正确 
            const hasPermission = perms.includes(value);
            if (!hasPermission) { // 如果没有权限就移除这个按钮元素 
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else { // 类型错误，抛出异常 
            throw new Error(`need perms! Like v-perms="'新增'"`)
        }
    }
})

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
