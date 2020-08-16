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
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 12px;
    /* text-align: center; */
    /* color: #2c3e50;
    margin-top: 60px; */
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: #f2f2f2;
}
</style>
