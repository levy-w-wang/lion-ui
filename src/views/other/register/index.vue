<!-- 注册 -->
<template>
    <el-container>
        <el-main>
            <div class="register-container">
                <div class="register-box">
                    <div class="register-box__title">Lion注册</div>
                    <el-form :model="registerUser"
                             ref="registerUser"
                             label-width="100px"
                             label-position="left"
                             class="register-form">
                        <el-form-item label="登录账号："
                                      prop="userName"
                                      :rules="[{ required: true, message: '登录账号不能为空', trigger: 'blur'},{pattern:/^(?!_)(?!.*?_$)[a-zA-Z0-9_]{4,12}$/,message:'登录账号不符合规则'}]">
                            <el-input v-model="registerUser.userName"
                                      placeholder="用于登录系统"
                                      @blur="checkExist(registerUser.userName,1)" />
                            <span class="el-form-item__error">{{userName_msg}}</span>
                        </el-form-item>
                        <el-form-item label="登录密码："
                                      prop="passWord"
                                      :rules="[{ required: true, message: '登录密码为空', trigger: 'blur'},{pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@!%*#?&~]{6,20}/,message:'登录密码不符合规则'}]">
                            <el-input placeholder="请输入密码，6-20位字符"
                                      v-model="registerUser.passWord"
                                      show-password></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱："
                                      prop="email"
                                      :rules="[{ required: true, message: '邮箱不能为空', trigger: 'blur'},{pattern:/^[A-Za-z0-9\u4e00-\u9fa5_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message:'邮箱格式不正确'}]">
                            <el-input v-model="registerUser.email"
                                      placeholder="邮箱用于找回密码"
                                      @blur="checkExist(registerUser.email,2)" />
                            <span class="el-form-item__error">{{email_msg}}</span>
                        </el-form-item>
                        <el-form-item prop="captcha"
                                      label="验证码："
                                      :rules="[{ required: true, message: '验证码为空', trigger: 'blur'},{pattern:/^[0-9]{6}$/,message:'验证码不正确，应为6位数字'}]">
                            <el-input type="text"
                                      v-model.trim="registerUser.captcha"
                                      placeholder="请输入6位数字验证码"
                                      autocomplete="off">
                                <el-button type="text"
                                           slot="suffix"
                                           @click="getCaptcha"
                                           :disabled="captchaDisable">{{ captchaMsg }}</el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary"
                                       style="width:100%"
                                       @click="registerSubmit">确定注册</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <el-link @click="$router.push('/login')"
                         class="to_login">已有帐号，立即登录 </el-link>
            </div>
        </el-main>
        <el-footer>
            <p style="color:#999">2020 © Levy_Lion.</p>
            <p>
                <el-link :underline="false"
                         href="https://beian.miit.gov.cn">蜀ICP备19039998号-2</el-link>
            </p>
        </el-footer>
    </el-container>
</template>

<script>
export default {
    data () {
        return {
            registerUser: {
                "userName": "",
                "passWord": "",
                "email": "",
                "captcha": ""
            },
            captchaMsg: "获取验证码",
            sendtime: 120,
            captchaDisable: true,
            userName_msg: '',
            email_msg: '',
        };
    },
    //引入组件 
    components: {},
    // 方法
    methods: {
        registerSubmit () {
            this.$refs.registerUser.validate((valid) => {
                if (valid) {
                    this.$api.user.register(this.registerUser).then(res => {
                        console.log(res);
                        if (res.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '账号注册成功，3秒后跳转到登录界面',
                            });
                            setTimeout(() => {
                                this.$router.push('/login')
                            }, 3000);
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        /**获取注册验证码 */
        getCaptcha () {
            this.$api.user.registercaptcha({ emailTo: this.registerUser.email }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '邮件已发送，请注意查收'
                    })
                    this.sendtime = 120
                    this.sendTime();
                    this.captchaDisable = true
                }
            })
        },
        /**发送验证码倒计时 */
        sendTime () {
            let _this = this;
            if (_this.sendtime <= 0) {
                _this.captchaMsg = '获取验证码';
                _this.sendtime = 120;
                _this.captchaDisable = false
                return;
            } else {
                _this.captchaMsg = _this.sendtime + 'S后重发';
                _this.sendtime--;
            }
            setTimeout(function () {
                _this.sendTime();
            }, 1000);
        },
        /**
         * 判断用户名和邮箱是否已存在
         * 并更改是否可获取验证码按钮
         */
        checkExist (pattern, type) {
            let filed = type == 1 ? 'userName' : 'email'
            this.$refs.registerUser.validateField(filed, valid => {
                if (!valid) {
                    this.$api.user.exist({ str: pattern, type: type }).then(res => {
                        console.log(res);
                        if (type == 1) {
                            if (res.code != 200) {
                                this.userName_msg = res.data
                            }
                            else {
                                this.userName_msg = ""
                            }
                        }
                        else {
                            if (res.code != 200) {
                                this.captchaDisable = true
                                this.email_msg = res.data
                            }
                            else {
                                this.captchaDisable = false
                                this.email_msg = ""
                                this.captchaMsg = '获取验证码';
                                this.sendtime = 0
                            }
                        }
                    })
                }
                else {
                    if (type == 2) {
                        this.captchaDisable = true
                    }
                }
            });
        }
    },
}

</script>
<style lang='scss' scoped>
.el-container {
    position: relative;
    width: 100%;
    height: 100%;
    .el-footer {
        text-align: center;
        color: #999;
        font-size: 13px;
        .el-link {
            font-size: 13px;
        }
    }
    .register-container {
        width: 600px;
        height: 450px;
        background: #fff;
        margin: auto;
        position: absolute;
        border-radius: 20px;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 15px;
        .register-box {
            position: relative;
            padding: 20px 30px 10px 0px;
            box-sizing: border-box;
            .register-box__title {
                text-align: center;
                font-weight: 500;
                font-size: 24px;
                color: #323233;
                margin-bottom: 34px;
            }
            .register-form {
                width: 420px;
                margin: auto;
            }
        }
        .to_login {
            font-size: 14px;
            color: #38f !important;
            display: block;
            margin: 0 10px 20px 0;
            float: right;
            text-decoration: none;
        }
    }
}
</style>