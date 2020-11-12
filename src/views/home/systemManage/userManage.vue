<!-- 用户管理 -->
<template>
    <div>
        <el-tabs v-model="activeTabName"
                 @tab-click="tabClick">
            <el-tab-pane label="用户管理"
                         name="user">
            </el-tab-pane>
            <el-tab-pane label="角色管理"
                         name="role">
            </el-tab-pane>
        </el-tabs>
        <component class="component-style"
                   :is="componentOn"></component>
    </div>
</template>

<script>
import UserComponent from './userComponents/userComponent'
import RoleComponent from './userComponents/roleComponent'
export default {
    data () {
        return {
            activeTabName: 'role'
        }
    },
    //引入组件
    components: {
        UserComponent,
        RoleComponent
    },
    // 方法
    methods: {
        tabClick (tab, event) {
            this.activeTabName = tab.name
        }
    },
    // 计算属性
    computed: {
        componentOn () {
            if (this.activeTabName == 'user') {
                return 'UserComponent'
            }
            // if (this.activeTabName == 'role')
            else {
                return 'RoleComponent'
            }
        }
    },
    //未挂载DOM,不能访问ref为空数组
    //可在这结束loading，还做一些初始化，实现函数自执行,
    //可以对data数据进行操作，可进行一些请求，请求不易过多，避免白屏时间太长。
    created () { },
    //可在这发起后端请求，拿回数据，配合路由钩子做一些事情；可对DOM 进行操作
    mounted () { },
}
</script>
<style lang="scss" scoped>
::v-deep .el-tabs__header {
    background-color: #fff;
    font-size: 14px;
    margin: 0px;
    .el-tabs__nav-scroll {
        padding: 0 16px;
    }
    .el-tabs__item {
        font-size: 14px;
    }
}
.component-style {
    background-color: #fff;
    margin: 15px;
}
</style>
