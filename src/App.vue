<template>
    <div id="app">
        <router-view v-wechat-title='$route.meta.title + " - lion"' />
    </div>
</template>

<script>

export default {
    name: 'app',
    data () {
        return {}
    },
}
</script>
<style>
@import "//at.alicdn.com/t/font_2238992_z3sxp1op2pa.css"; /*引入阿里图标库样式*/
</style>
