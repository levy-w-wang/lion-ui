<!-- 消息提示框 -->
<template>
    <el-drawer title="消息提示"
               :modal="false"
               :withHeader="true"
               :visible.sync="$store.state.user.showHiteMessage"
               direction="rtl">
        <el-card shadow="hover"
                 v-for="(item,index) in hiteMessage"
                 :key="index">
            <router-link :to="item.url">
                <span class="card-sp1">{{ item.title }}</span>
                <span class="card-sp2">{{ item.time }}</span>
            </router-link>
        </el-card>
    </el-drawer>
</template>

<script>
import { mapState } from 'vuex'
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
    computed: {
        ...mapState({
            hiteMessage: (state) => state.user.hiteMessage,
        }),
    },
}

</script>
<style lang='scss' scoped>
::v-deep .el-drawer {
    //top: $header-height + 45px;
    //position: fixed;
    bottom: 0;
    right: 0;
    width: 400px !important;
    -webkit-box-shadow: -3px -3px 8px rgba(0, 0, 0, 0.2);
    box-shadow: -3px -3px 8px rgba(0, 0, 0, 0.2);
    background-color: #fff;
}
::v-deep .el-drawer__header {
    text-align: left;
    font-size: 16px;
    color: #333;
    margin-bottom: 15px;
}
::v-deep .el-drawer__body {
    overflow-y: auto;
    padding-top: 5px;
}
::v-deep .el-card {
    height: 50px;
    line-height: 50px;
    padding: 0px;
    .el-card__body {
        height: 50px;
        line-height: 50px;
        padding: 0px;
        .card-sp1 {
            text-align: left;
            padding-left: 10px;
            float: left;
            width: 55%;
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
        }
        .card-sp2 {
            text-align: right;
            padding-right: 10px;
            float: right;
            width: 35%;
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
        }
    }
}
</style>