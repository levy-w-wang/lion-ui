<!-- 布局的首页 -->
<template>
    <div>
        <l-header></l-header>
        <l-aside></l-aside>
        <l-main></l-main>
    </div>
</template>

<script>
import LHeader from './components/header'
import LAside from './components/aside'
import LMain from './components/main'
export default {
    data () {
        return {}
    },
    //引入组件
    components: {
        LHeader,
        LAside,
        LMain,
    },
}
</script>
<style lang="scss" scoped>
</style>
