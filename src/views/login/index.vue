<template>
    <div class="loginContain">
        <div class="loginBox">
            <h2 class="loginH2"><strong>Vue</strong> 后台管理系统</h2>
            <el-form :model="loginForm"
                     :rules="loginFormRules"
                     ref="loginForm"
                     label-position="left"
                     label-width="0px"
                     class="login-form">
                <el-form-item prop="email">
                    <el-input type="text"
                              v-model.trim="loginForm.email"
                              auto-complete="off"
                              @keyup.enter.native="login"
                              placeholder="邮箱">
                        <i slot="prefix"
                           class="el-input__icon el-icon-user-solid"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password"
                              v-model.trim="loginForm.password"
                              auto-complete="off"
                              @keyup.enter.native="login"
                              show-password
                              placeholder="密码">
                        <i slot="prefix"
                           class="el-input__icon el-icon-lock"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="captcha">
                    <el-row>
                        <el-col :span="14">
                            <el-input type="text"
                                      v-model.trim="loginForm.captcha"
                                      @keyup.enter.native="login"
                                      auto-complete="off"
                                      placeholder="请输入验证码">
                            </el-input>
                        </el-col>
                        <el-col :span="8"
                                :offset="2">
                            <el-image @click="getCaptcha"
                                      class="captcha_img"
                                      :load="true"
                                      :src="captchaBase64"></el-image>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item style="width:100%;">
                    <el-button type="primary"
                               style="width: 100%; background: #19b9e7;"
                               @click.native.prevent="login"
                               :loading="logining">登 录</el-button>
                </el-form-item>
                <el-link @click="$router.push('/retrievepwd')"
                         class="to_link"
                         style="float:left">忘记密码</el-link>
                <el-link @click="$router.push('/register')"
                         class="to_link"
                         style="float:right">注册</el-link>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            logining: false,
            loginForm: {
                email: 'levy_wang@qq.com',
                password: 'qwer1234',
                captcha: '',
                uuid: ''
            },
            captchaBase64: '',
            loginFormRules: {
                email: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }, { pattern: '^[A-Za-z0-9]{4}$', message: '验证码为4位字符', trigger: ['blur', 'change'] }],
            },
        }
    },
    //引入组件
    components: {},
    // 方法
    methods: {
        login () {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    this.logining = true
                    this.$api.user.login(this.loginForm).then((res) => {
                        if (res.data && res.success) {
                            this.$store.commit('setUserInfo', res.data)
                            let redirect = '/'
                            if (this.$route.query.redirect !== undefined) {
                                redirect = this.$route.query.redirect
                            }

                            this.$message({
                                type: 'success',
                                message: '登录成功',
                                duration: 800,
                            })
                            this.$router.push("/")
                            // 登录跳转到退出界面
                            if (this.$route.query.redirect != '/') {
                                let time = 0;
                                let goToredirectUrl = () => {
                                    if (time > 1000 || this.$store.state.app.menuLoad) {
                                        if (this.$router.match(redirect) && this.$router.match(redirect).name !== 'notfound') {
                                            this.$router.push(redirect)
                                        }
                                        return;
                                    }
                                    else { setTimeout(() => goToredirectUrl(), 50) }
                                    time += 50;
                                }
                                goToredirectUrl()
                            }
                        }
                        else {
                            this.logining = false
                            this.getCaptcha()
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        getCaptcha () {
            this.$api.system.getCaptcha().then(res => {
                if (res.code == 200 && res.data) {
                    this.captchaBase64 = 'data:image/png;base64,' + res.data.captchaBase64Data
                    this.loginForm.uuid = res.data.uuid
                    this.loginForm.captcha = ''
                }
            })
        },
    },
    created () {
        //若是使用状态退出 则刷新一下 重置vuex
        if (this.$store.state.app.mainTabsActiveName != '') {
            window.location.reload()
        }
        this.getCaptcha();
    },
}
</script>
<style lang="scss" scoped>
$inputHeight: 48px;

.loginContain {
    height: 100%;
    width: 100%;
    background: url(../../assets/img/loginbg.jpg) no-repeat center center;
    background-size: 100% 100%;
    overflow: hidden;
    .captcha_img {
        display: inline;
        line-height: 52px;
        vertical-align: -webkit-baseline-middle;
    }
}
.loginBox {
    height: 455px;
    width: 550px;
    margin: 0 auto;
    position: relative;
    top: 20%;
}
.loginH2 {
    font-size: 28px;
    color: #fff;
    text-align: center;
}

.el-input {
    background-color: transparent;
    border-radius: 20px;
    height: $inputHeight;
    color: #ffffff !important;
    border: rgba(255, 255, 255, 0.2) 2px solid !important;
}

::v-deep .el-input__inner {
    padding-left: 30px;
    background-color: transparent !important;
    border: none !important;
    height: $inputHeight !important;
    color: #ffffff !important;
}
.login-form {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 10px auto;
    width: 380px;
    padding: 35px 35px 15px 35px;
}
.to_link {
    font-size: 14px;
    color: #38f !important;
    display: block;
    text-decoration: none;
}
</style>
