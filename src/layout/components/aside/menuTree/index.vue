<!-- 动态菜单组成 -->
<template>
    <div>
        <!-- :popper-append-to-body="false" 解决 el-menu垂直布局递归生成菜单及菜单折叠后hover报错Maximum call stack size exceeded -->
        <!-- 但是会导致最上面的菜单嵌入页面，无法显示出来  因此使用外层嵌套div加样式的解决方案-->
        <el-submenu v-if="menu.childMenus && menu.childMenus.length >= 1"
                    :index="'' + menu.menuId"
                    :popper-append-to-body="true">
            <template slot="title">
                <i :class="menu.icon"></i>
                <span slot="title">{{ menu.menuName }}
                </span>
            </template>
            <menu-tree v-for="item in menu.childMenus"
                       :key="item.menuId"
                       :menu="item">
            </menu-tree>
        </el-submenu>
        <el-menu-item v-else-if="menu.url == ''"
                      :index="'' + menu.menuId"
                      disabled>
            <i class="el-icon-magic-stick"></i>
            <span slot="title">{{ menu.menuName }}
            </span>
        </el-menu-item>
        <el-menu-item v-else
                      v-show="menu.hidden !== true"
                      :index="'' + menu.menuId"
                      @click="$router.push('/' + menu.url)">
            <i :class="menu.icon"></i>
            <span slot="title">{{ menu.menuName }}
            </span>
        </el-menu-item>
    </div>
</template>

<script>
export default {
    name: "MenuTree",
    props: {
        menu: {
            type: Object,
            required: true
        }
    },
    data () {
        return {}
    },

}
</script>
<style lang="scss" scoped>
.el-menu--collapse > div > .el-submenu > .el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
}
.el-menu--collapse
    > div
    > .el-submenu
    > .el-submenu__title
    .el-submenu__icon-arrow {
    display: none;
}
</style>
