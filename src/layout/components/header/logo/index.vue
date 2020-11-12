<!--  -->
<template>
    <div class="logo"
         :class="isCollapse ? 'logo-collapse-width' : 'logo-width'">
        <img v-if="isCollapse"
             class="logo-collapse-width logoImg"
             src="@assets/logo6065.png"
             @click="$router.push('/')" />
        <img v-else
             src="@assets/logo.png"
             class="logo-width logoImg"
             @click="$router.push('/')" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {}
    },
    computed: {
        ...mapState({
            isCollapse: (state) => state.app.isCollapse,
        }),
    },
}
</script>
<style lang="scss" scoped>
.logo {
    position: relative;
    float: left;
    height: $header-height;
    padding: 0;
    margin: 0;
    overflow: hidden;
}
.logo-width {
    width: $aside-width;
}
.logo-collapse-width {
    width: $aside-collapse-width;
}
.logo-img {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    height: $header-height;
    transform: translate(-50%, -50%);
}
</style>
