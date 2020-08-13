<template>
    <div class="site-wrapper site-page">
        <div class="site-content__wrapper">
            <div class="site-content">
                <h2 class="not-found-title">三级菜单嵌套2</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.site-wrapper.site-page {
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    .site-content__wrapper {
        padding: 0;
        margin: 0;
        background-color: #fff;
    }
    .site-content {
        position: fixed;
        top: 15%;
        left: 50%;
        z-index: 2;
        padding: 30px;
        text-align: center;
        transform: translate(-50%, 0);
    }
}
</style>
