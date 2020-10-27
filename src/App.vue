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
</style>
