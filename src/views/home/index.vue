<!-- 首页 -->
<template>
    <el-container>
        <el-header class="header">
            <!-- logo -->
            <div class="logo"
                 :class="isCollapse ? 'logo-collapse-width' : 'logo-width'">
                <img v-if="isCollapse"
                     src="@assets/logo6065.png" />
                <img v-else
                     src="@assets/logo.png" />
            </div>
            <!-- 折叠按钮 -->
            <div class="tools"
                 @click.prevent="collapse">
                <i class="el-icon-menu"></i>
            </div>
            <!-- 头部导航栏 -->
            <div class="heardNavBar">
                <el-menu default-active="1"
                         class="el-menu-demo"
                         background-color="#4b5f6e"
                         text-color="#fff"
                         active-text-color="#ffd04b"
                         mode="horizontal">
                    <el-menu-item index="1"
                                  @click="$router.push('/')">首页</el-menu-item>
                    <el-menu-item index="2"
                                  @click="openUrl('#')">使用文档</el-menu-item>
                    <el-menu-item index="3"
                                  @click="openUrl('https://github.com/levy-w-wang/lion-ui')">GitHub</el-menu-item>
                </el-menu>
            </div>
            <!-- 右侧信息 -->
            <div style="float:right">
                <!-- 全屏 -->
                <div style="float:left;line-height: 60px; padding: 0 10px;">
                    <i class="el-icon-full-screen"
                       @click="toggleFull"></i>
                </div>
                <!-- 个人信息 -->
                <div class="userinfo">
                    <el-dropdown trigger="hover">
                        <span class="el-dropdown-link userinfo-inner">
                            <img src="@assets/img/user.jpg" />
                            {{ $store.getters.userInfo.nickName }}<i class="el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <router-link to="/"><i class="el-icon-s-home"></i>首页</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <router-link to="/"><i class="el-icon-s-custom"></i>我的主页</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item divided>
                                <a @click="loginOut()"><i class="el-icon-switch-button"></i>登出</a>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-header>
        <el-container>
            <el-aside class="aside">
                <!--导航菜单  default-active="1-1"-->
                <el-menu class="el-menu-vertical-demo"
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
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import screenfull from 'screenfull'
export default {
    data () {
        return {
            isCollapse: false,
        }
    },
    //引入组件
    components: {},
    // 方法
    methods: {
        openUrl (url) {
            window.open(url)
        },
        //折叠导航栏
        collapse: function () {
            this.isCollapse = !this.isCollapse
        },
        loginOut () {
            this.$confirm('确认退出吗?', '提示', {
                type: 'warning',
            })
                .then(() => {
                    this.$store.commit('logout')
                })
                .catch(() => { })
        },
        toggleFull () {
            if (!screenfull.isEnabled) {
                this.$message({
                    type: 'warning',
                    message: 'you browser can not work',
                })
                return false
            }
            screenfull.toggle()
        },
    },
    // 计算属性
    computed: {},
    //未挂载DOM,不能访问ref为空数组
    //可在这结束loading，还做一些初始化，实现函数自执行,
    //可以对data数据进行操作，可进行一些请求，请求不易过多，避免白屏时间太长。
    created () { },
    //可在这发起后端请求，拿回数据，配合路由钩子做一些事情；可对DOM 进行操作
    mounted () { },
}
</script>

<style lang="scss" scoped>
.aside {
    flex: 0 0 230px;
    height: 100%;
    .el-menu {
        height: 100%;
        text-align: left;
    }
}
.header {
    padding-left: 0px !important;
    height: 60px;
    line-height: 60px;
    width: 100%;
    background: #4b5f6e;
    color: #fff;
    .logo {
        float: left;
        height: 60px;
        padding: 0;
        margin: 0;
    }
    .logo-width {
        width: 230px;
    }
    .logo-collapse-width {
        width: 65px;
    }

    .tools {
        padding-left: 10px;
        padding-right: 10px;
        text-align: center;
        width: 40px;
        height: 60px;
        line-height: 60px;
        float: left;
        cursor: pointer;
    }
    .heardNavBar {
        float: left;
        background: #4b5f6e;
        padding: 0px 0px;
        height: 60px;
        line-height: 60px;
        font-size: 28px;
        cursor: pointer;
    }

    .userinfo {
        text-align: right;
        padding-right: 24px;
        float: right;
        padding: 0 10px;
        .userinfo-inner {
            font-size: 20px;
            cursor: pointer;
            color: #fff;
            img {
                width: 40px;
                height: 40px;
                border-radius: 10px;
                margin: 10px 0px 10px 10px;
                float: right;
            }
        }
    }
}
</style>
