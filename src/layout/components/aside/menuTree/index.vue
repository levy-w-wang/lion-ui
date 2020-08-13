<!-- 动态菜单组成 -->
<template>
    <!-- :popper-append-to-body="false" 解决 el-menu垂直布局递归生成菜单及菜单折叠后hover报错Maximum call stack size exceeded -->
    <el-submenu v-if="menu.children && menu.children.length >= 1"
                :index="'' + menu.menuId"
                :popper-append-to-body="false">
        <template slot="title">
            <i :class="menu.icon"></i>
            <span slot="title">{{ menu.menuName }}
            </span>
        </template>
        <menu-tree v-for="item in menu.children"
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
                  :index="'' + menu.menuId"
                  @click="$router.push('/' + menu.url)">
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.menuName }}
        </span>
    </el-menu-item>
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
<style lang="scss" scoped></style>
