<!-- aside -->
<template>
    <div class="aside-container"
         :class="isCollapse ? 'aside-collapse-width' : 'aside-width'">
        <!--导航菜单  default-active="1-1"-->
        <el-menu class="el-menu-vertical-demo"
                 :class="isCollapse ? 'aside-collapse-width' : 'aside-width'"
                 :collapse-transition="false"
                 :unique-opened="true"
                 :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">系统管理</span>
                </template>
                <el-menu-item index="1-1"
                              @click="$router.push('usermanage')">用户管理</el-menu-item>
                <el-menu-item index="1-2"
                              @click="$router.push('menumanage')">菜单管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="2"
                          disabled>
                <i class="el-icon-magic-stick"></i>
                <span slot="title">导航一</span>
            </el-menu-item>
            <el-menu-item index="3"
                          disabled>
                <i class="el-icon-reading"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {}
    },
    //$store.getters.isCollapse
    computed: {
        ...mapState({
            isCollapse: (state) => state.app.isCollapse,
        }),
        mainTabs: {
            get () {
                return this.$store.state.app.mainTabs
            },
            set (val) {
                this.$store.commit('updateMainTabs', val)
            },
        },
        mainTabsActiveName: {
            get () {
                return this.$store.state.app.mainTabsActiveName
            },
            set (val) {
                this.$store.commit('updateMainTabsActiveName', val)
            },
        },
    },
    watch: {
        $route: 'handleRoute',
    },
    created () {
        console.log(this.$route)
        this.handleRoute(this.$route)
    },
    methods: {
        // 路由操作处理
        handleRoute (route) {
            // tab标签页选中, 如果不存在则先添加
            var tab = this.mainTabs.filter((item) => item.name === route.name)[0]
            if (!tab) {
                tab = {
                    name: route.name,
                    title: route.meta.title,
                    icon: route.meta.icon,
                }
                this.mainTabs = this.mainTabs.concat(tab)
            }
            this.mainTabsActiveName = tab.name
        },
    },
}
</script>
<style lang="scss" scoped>
.aside-container {
    position: fixed;
    top: 0px;
    left: 0;
    bottom: 0;
    z-index: 1020;
    .el-menu {
        position: absolute;
        top: 60px;
        bottom: 0px;
        text-align: left;
    }
}
.aside-width {
    width: 230px;
}
.aside-collapse-width {
    width: 65px;
}
</style>
