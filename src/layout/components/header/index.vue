<!-- 头部文件 -->
<template>
    <div class="header"
         :style="{ background: themeColor }">
        <!-- logo -->
        <logo></logo>
        <!-- 折叠按钮 -->
        <hamburger>
        </hamburger>
        <!-- 头部导航栏 -->
        <div class="heardNavBar">
            <el-menu default-active="1"
                     class="el-menu-demo"
                     :background-color="themeColor"
                     text-color="#fff"
                     active-text-color="#ffd04b"
                     mode="horizontal">
                <el-menu-item index="1"
                              @click="$router.push('/')">首页</el-menu-item>
                <el-menu-item index="2"
                              @click="openUrl('http://book.levy.net.cn/doc/frontend/uiframe/env.html')">使用文档</el-menu-item>
                <el-menu-item index="3"
                              @click="openUrl('https://github.com/levy-w-wang/lion-ui')">GitHub</el-menu-item>
            </el-menu>
        </div>
        <!-- 右侧信息 -->
        <div style="float:right"
             :background-color="themeColor">
            <el-menu :background-color="themeColor"
                     text-color="#fff"
                     active-text-color="#aaa2aa"
                     mode="horizontal">
                <el-menu-item index="1">
                    <!-- 主题切换 -->
                    <theme-picker :default="themeColor"
                                  @onThemeChange="onThemeChange">
                    </theme-picker>
                </el-menu-item>
                <el-menu-item index="2"
                              @click="toggleFull">
                    <!-- 全屏 -->
                    <el-tooltip effect="dark"
                                content="全屏展示"
                                placement="bottom">
                        <i class="el-icon-full-screen"
                           style="font-size: 24px;">
                        </i>
                    </el-tooltip>
                </el-menu-item>
                <el-menu-item index="3"
                              @click="toggleShowHiteMsg">
                    <!-- 信息提示 -->
                    <el-badge :is-dot="hasHiteMessage"
                              class="badge-item">
                        <i class="el-icon-message-solid"
                           style="font-size: 24px;">
                        </i>
                    </el-badge>
                </el-menu-item>
                <el-menu-item index="4">
                    <!-- 个人信息 -->
                    <div class="userinfo">
                        <el-dropdown trigger="hover">
                            <span class="el-dropdown-link userinfo-inner">
                                <img src="@assets/img/user.jpg" />
                                {{ $store.getters.userInfo.username }}<i class="el-icon-caret-bottom"></i>
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
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
import screenfull from 'screenfull'
import hamburger from './hamburger'
import ThemePicker from '@/components/ThemePicker'
import logo from './logo'
import { mapState } from 'vuex'
export default {
    data () {
        return {
        }
    },
    computed: {
        ...mapState({
            // isCollapse: (state) => state.app.isCollapse,
            themeColor: (state) => state.app.themeColor,
            hasHiteMessage: (state) => state.user.hiteMessage.length > 0,
        }),
        showHiteMessage: {
            get () {
                return this.$store.state.user.showHiteMessage
            },
            set () {
                this.$store.commit('toggleShowHiteMessage')
            }
        }
    },
    //引入组件
    components: {
        hamburger,
        logo,
        ThemePicker
    },
    // 方法
    methods: {
        // 切换主题
        onThemeChange (themeColor) {
            console.log(themeColor)
            this.$store.commit("setThemeColor", themeColor);
        },
        openUrl (url) {
            window.open(url)
        },
        loginOut () {
            this.$confirm('确认退出吗?', '提示', {
                type: 'warning',
            })
                .then(() => {
                    this.$store.commit('logout')
                    // this.$store.commit('resetMenu')
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
        toggleShowHiteMsg () {
            this.showHiteMessage = !this.showHiteMessage;
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
.header {
    padding-left: 0px !important;
    height: $header-height;
    line-height: $header-height;
    width: 100%;
    background: #4b5f6e;
    color: #fff;

    .heardNavBar {
        float: left;
        background: #4b5f6e;
        padding: 0px 0px;
        height: $header-height;
        line-height: $header-height;
        font-size: 28px;
        cursor: pointer;
    }

    .userinfo {
        // text-align: right;
        padding-right: 24px;
        float: right;
        padding: 0 5px;
        .userinfo-inner {
            font-size: 20px;
            cursor: pointer;
            color: #fff;
            img {
                width: $header-height - 12px;
                height: $header-height - 12px;
                border-radius: 6px;
                margin: 6px 0px 6px 6px;
                float: right;
            }
        }
    }
    ::v-deep .el-badge__content {
        margin-top: 10px;
        margin-right: 10px;
    }
}
</style>
