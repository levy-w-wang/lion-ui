<!--  -->
<template>
    <div class="logo"
         :class="isCollapse ? 'logo-collapse-width' : 'logo-width'">
        <img v-if="isCollapse"
             src="@assets/logo6065.png"
             @click="$router.push('/')" />
        <img v-else
             src="@assets/logo.png"
             @click="$router.push('/')" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {
        };
    },
    computed: {
        ...mapState({
            isCollapse: (state) => state.app.isCollapse,
        }),
    },
}

</script>
<style lang='scss' scoped>
.logo {
    float: left;
    height: 60px;
    padding: 0;
    margin: 0;
}
.logo-width {
    width: 230px;
}
.logo-collapse-width {
    width: 65px;
}
</style>