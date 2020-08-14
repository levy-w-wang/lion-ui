<!--  -->
<template>
    <div class="logo" :class="isCollapse ? 'logo-collapse-width' : 'logo-width'">
        <img v-if="isCollapse" class="logo-collapse-width" src="@assets/logo6065.png" @click="$router.push('/')" />
        <img v-else src="@assets/logo.png" class="logo-width" @click="$router.push('/')" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
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
    float: left;
    height: $header-height;
    padding: 0;
    margin: 0;
}
.logo-width {
    width: $aside-width;
}
.logo-collapse-width {
    width: $aside-collapse-width;
}
</style>
