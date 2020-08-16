<!-- 菜单管理 -->
<template>
    <div>
        <el-tree :data="menuTree"
                 show-checkbox
                 node-key="menuId"
                 ref="tree"
                 :default-expand-all="false"
                 :expand-on-click-node="false"
                 :props="defaultProps">
            <el-row :gutter="10"
                    class="custom-tree-node"
                    slot-scope="{ node, data }">
                <el-col :span="2">
                    <div>{{ data.menuId }}</div>
                </el-col>
                <el-col :span="6">
                    <div>{{ data.menuName }}</div>
                </el-col>
                <el-col :span="6">
                    <div>{{ data.url }}</div>
                </el-col>
                <el-col :span="4">
                    <div>{{ data.icon }}</div>
                </el-col>
                <el-col :span="6">
                    <el-link type="success"
                             :underline="false"
                             @click="() => append(data)">
                        增加
                    </el-link>
                    <el-link type="danger"
                             style="margin-left:10px"
                             :underline="false"
                             @click="() => remove(node, data)">
                        删除
                    </el-link>
                    <div></div>
                </el-col>
            </el-row>
        </el-tree>

        <el-button @click="getCheckedNodes">通过 node 获取</el-button>
        <el-button @click="getCheckedKeys">通过 key 获取</el-button>
    </div>
</template>

<script>
let id = 1000;
export default {
    data () {
        return {
            defaultProps: {
                children: 'children',
                label: 'menuName'
            }
        }
    },
    //引入组件
    components: {},
    // 方法
    methods: {
        append (data) {
            const newChild = { menuId: id++, menuName: 'testtest', children: [] };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },

        remove (node, data) {
            console.log(node)
            console.log(data)
            // const parent = node.parent;
            // const children = parent.data.children || parent.data;
            // const index = children.findIndex(d => d.menuId === data.menuId);
            // children.splice(index, 1);
        },
        getCheckedNodes () {
            console.log(this.$refs.tree.getCheckedNodes(false, true));
        },
        getCheckedKeys () {
            console.log(this.$refs.tree.getCheckedKeys());
        },
    },
    computed: {
        menuTree () {
            return this.$store.state.app.menuTree
        }

    },
    created () {
        console.log(this.menuTree);
    },
    //可在这发起后端请求，拿回数据，配合路由钩子做一些事情；可对DOM 进行操作
    mounted () { },
}
</script>
<style lang="scss" scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    font-size: 14px;
    align-items: center;
    // justify-content: space-between;
    // width: 100%;
    height: 30px;
    line-height: 30px;
}
// ::v-deep .el-tree-node {
//     margin: 0 10px;
// }
</style>
