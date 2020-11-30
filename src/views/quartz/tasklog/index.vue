<!-- 任务日志 -->
<template>
    <div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    //引入组件 
    components: {},
    // 方法
    methods: {},
    // 计算属性  
    computed: {},
    //未挂载DOM,不能访问ref为空数组
    //可在这结束loading，还做一些初始化，实现函数自执行,
    //可以对data数据进行操作，可进行一些请求，请求不易过多，避免白屏时间太长。
    created () { },
    //可在这发起后端请求，拿回数据，配合路由钩子做一些事情；可对DOM 进行操作
    mounted () { }
}

</script>
<style lang='scss' scoped>
</style>