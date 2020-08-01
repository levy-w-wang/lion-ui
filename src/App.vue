<template>
    <div id="app">
        <img src="./assets/logo.png" />
        <div>
            <p>
                If Element is successfully added to this project, you'll see an
                <code v-text="'<el-button>'"></code>
                below
            </p>
            <el-button type="success">el-button</el-button>
            <el-button type="info" @click="loginFunc">登录</el-button>
        </div>
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { login } from '@/api/modules/user'
export default {
    name: 'app',
    components: {
        HelloWorld,
    },
    data() {
        return {}
    },
    methods: {
        loginFunc() {
            console.log(login)
            // console.log(this.$api.user.login)
            this.$api.login({ username: 'admin', password: '123456' }).then((data) => {
                this.$message({
                    type: 'success',
                    message: JSON.stringify(data),
                })
            })
        },
    },
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
