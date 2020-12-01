<!-- 分页插件封装 -->
<template>

    <div class="public-pagination">
        <div class="operation">
            <slot>
                <!-- 使用 底部按钮 -->
            </slot>
        </div>

        <el-pagination :current-page.sync="currentPage"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-size.sync="pageSize"
                       :page-sizes="pageSizes"
                       :total="total"
                       layout="total, sizes, prev, pager, next, jumper"
                       :background="background">
        </el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        //总条数
        total: {
            required: true,
            type: Number
        },
        page: {
            type: Number,
            default: 1
        },
        limit: {
            type: Number,
            default: 20
        },
        pageSizes: {
            type: Array,
            default () {
                return [10, 20, 30, 50]
            }
        },
        background: {
            type: Boolean,
            default: true
        },
    },
    data () {
        return {
        };
    },
    computed: {
        currentPage: {
            get () {
                return this.page
            },
            set (val) {
                this.$emit('update:page', val)
            }
        },
        pageSize: {
            get () {
                return this.limit
            },
            set (val) {
                this.$emit('update:limit', val)
            }
        }
    },
    // 方法
    methods: {
        handleSizeChange (val) {
            this.$emit('pagination')
        },
        handleCurrentChange (val) {
            this.$emit('pagination')
        }
    },
}

</script>
<style lang='scss' scoped>
</style>