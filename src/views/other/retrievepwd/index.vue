<!-- 注册 -->
<template>
    <el-container>
        <el-main>
            <div class="retrievePwd-container">
                <div class="retrievePwd-box">
                    <div class="retrievePwd-box__title">Lion_找回密码</div>
                    <el-form :model="retrievePwd"
                             ref="retrievePwd"
                             label-width="100px"
                             label-position="left"
                             class="retrievePwd-form">
                        <el-form-item label="邮箱："
                                      prop="email"
                                      :rules="[{ required: true, message: '邮箱不能为空', trigger: 'blur'},{pattern:/^[A-Za-z0-9\u4e00-\u9fa5_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message:'邮箱格式不正确'}]">
                            <el-input v-model="retrievePwd.email"
                                      placeholder="找回密码的账号邮箱" />
                        </el-form-item>
                        <el-form-item prop="captcha"
                                      label="验证码："
                                      :rules="[{ required: true, message: '验证码为空', trigger: 'blur'},{pattern:/^[0-9]{6}$/,message:'验证码不正确，应为6位数字'}]">
                            <el-input type="text"
                                      v-model.trim="retrievePwd.captcha"
                                      placeholder="请输入6位数字验证码"
                                      autocomplete="off">
                                <el-button type="text"
                                           slot="suffix"
                                           @click="getCaptcha"
                                           :disabled="captchaDisable">{{ captchaMsg }}</el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="新密码："
                                      prop="pwd"
                                      :rules="[{ required: true, message: '新密码为空', trigger: 'blur'},{pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@!%*#?&~]{6,20}/,message:'新密码不符合规则'}]">
                            <el-input placeholder="请输入密码，6-20位字符"
                                      v-model="retrievePwd.pwd"
                                      show-password></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary"
                                       style="width:100%"
                                       @click="retrievePwdSubmit">确定修改</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <el-link @click="$router.push('/login')"
                         class="to_login"> 登录 </el-link>
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
            retrievePwd: {
                "nickName": "",
                "pwd": "",
                "email": "",
                "captcha": ""
            },
            captchaMsg: "获取验证码",
            sendtime: 120,
            captchaDisable: false,
        };
    },
    //引入组件 
    components: {},
    // 方法
    methods: {
        retrievePwdSubmit () {
            this.$refs.retrievePwd.validate((valid) => {
                if (valid) {
                    this.$api.user.retrievepwd(this.retrievePwd).then(res => {
                        console.log(res);
                        if (res.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '密码重置成功，3秒后跳转到登录界面',
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
            this.$api.user.sendemailrestpwd({ email: this.retrievePwd.email }).then(res => {
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
    .retrievePwd-container {
        width: 600px;
        height: 400px;
        background: #fff;
        margin: auto;
        position: absolute;
        border-radius: 20px;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 15px;
        .retrievePwd-box {
            position: relative;
            padding: 20px 30px 10px 0px;
            box-sizing: border-box;
            .retrievePwd-box__title {
                text-align: center;
                font-weight: 500;
                font-size: 24px;
                color: #323233;
                margin-bottom: 34px;
            }
            .retrievePwd-form {
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