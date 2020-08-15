<!-- aside -->
<template>
    <div class="aside-container"
         :class="isCollapse ? 'aside-collapse-width' : 'aside-width'">
        <el-scrollbar>
            <!--导航菜单  default-active="1-1"  :background-color="themeColor" -->
            <el-menu class="el-menu-vertical-demo"
                     :class="isCollapse ? 'aside-collapse-width' : 'aside-width'"
                     :collapse-transition="false"
                     :unique-opened="true"
                     :collapse="isCollapse"
                     ref="menuTreeRef"
                     :background-color="themeColor"
                     text-color="#fff"
                     active-text-color="#ffd04b">
                <menu-tree v-for="menu in menuTree"
                           :key="menu.menuId"
                           :menu="menu">
                </menu-tree>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import MenuTree from './menuTree'
export default {
    data () {
        return {}
    },
    components: {
        MenuTree,
    },
    computed: {
        ...mapState({
            isCollapse: (state) => state.app.isCollapse,
            themeColor: (state) => state.app.themeColor,
            menuTree: (state) => state.app.menuTree,
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
            //解决刷新后，无法定位到当前打开菜单栏
            this.$nextTick(() => {
                // 切换标签页时同步更新高亮菜单
                if (this.$refs.menuTreeRef != null) {
                    this.$refs.menuTreeRef.activeIndex = '' + route.meta.index
                    this.$refs.menuTreeRef.initOpenedMenu()
                }
            })
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
        top: 0px;
        bottom: 0px;
        text-align: left;
    }
    .el-scrollbar {
        height: calc(100% - #{$header-height});
        top: $header-height;
        bottom: 50px;
        overflow-y: auto;
    }
}
.aside-width {
    width: $aside-width;
}
.aside-collapse-width {
    width: $aside-collapse-width;
}
</style>
