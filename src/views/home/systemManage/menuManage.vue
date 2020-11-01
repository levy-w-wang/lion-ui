<!-- 菜单管理 -->
<template>
    <div>
        <el-row class="custom-tree-node"
                style="padding-left: 40px;background-color: turquoise;">
            <el-col :span="2">
                <span>菜单ID</span>
            </el-col>
            <el-col :span="3">
                <span>菜单名称</span>
            </el-col>
            <el-col :span="5">
                <span>菜单路径</span>
            </el-col>
            <el-col :span="5">
                <span>菜单图标</span>
            </el-col>
            <el-col :span="2">
                <span>是否物理删除</span>
            </el-col>
            <el-col :span="4">
                <span>按钮权限</span>
            </el-col>
            <el-col :span="3">
                <span>操作</span>
            </el-col>
        </el-row>
        <el-tree :data="menuTree"
                 show-checkbox
                 node-key="menuId"
                 ref="tree"
                 :default-expand-all="false"
                 :expand-on-click-node="false"
                 :props="defaultProps">
            <el-row class="custom-tree-node"
                    slot-scope="{ node, data }">
                <el-col :span="2">
                    <span>{{ data.menuId }}</span>
                </el-col>
                <el-col :span="3">
                    <span>{{ data.menuName }}</span>
                </el-col>
                <el-col :span="5">
                    <span>{{ data.url }}</span>
                </el-col>
                <el-col :span="5">
                    <span>{{ data.icon }}</span>
                </el-col>
                <el-col :span="2">
                    <span>{{ data.deleted }}</span>
                </el-col>
                <el-col :span="4">
                    <span>
                        按钮控制个数 {{data.buttonPerms.length}}
                        <el-button type="text"
                                   style="color:#8CC5FF"
                                   @click="btnPermsInfo(data)">查看</el-button>
                    </span>
                </el-col>
                <el-col :span="3">
                    <el-button type="text"
                               style="color:#8CC5FF"
                               @click="addMenu(data)">新增</el-button>
                    <el-button type="text"
                               style="color:#8CC5FF"
                               @click="updateMenu(data,node)">编辑</el-button>
                    <el-button type="text"
                               style="color:#F56C6C"
                               @click="deleteMenu(data,node)">删除</el-button>
                </el-col>
            </el-row>
        </el-tree>
        <el-button @click="getCheckedNodes">通过 node 获取</el-button>
        <el-button @click="getCheckedKeys">通过 key 获取</el-button>

        <el-drawer title="菜单按钮信息"
                   :visible.sync="drawerButton"
                   direction="rtl">
            <span>我来啦!</span>
        </el-drawer>
    </div>
</template>

<script>
let id = 1000;
export default {
    data () {
        return {
            menuTree: null,
            drawerButton: false,
            defaultProps: {
                children: 'childMenus',
                label: 'menuName'
            }
        }
    },
    //引入组件
    components: {},
    // 方法
    methods: {
        btnPermsInfo (row) {
            this.drawerButton = true;
        },
        addMenu (row, node) {
            const newChild = { menuId: id++, menuName: 'testtest', children: [] };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },
        updateMenu (row, node) {
            console.log(node)
            console.log(data)
            // const parent = node.parent;
            // const children = parent.data.children || parent.data;
            // const index = children.findIndex(d => d.menuId === data.menuId);
            // children.splice(index, 1);
        },
        deleteMenu (row, node) {
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
        // menuTree () {
        //     return this.$store.state.app.menuTree
        // }
    },
    created () {
        this.$api.menu.getMenuManage().then(res => {
            if (res.code == 200) {
                this.menuTree = res.data
                console.log(res.data);
            }
        })
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
    // text-align: center;
    // justify-content: space-between;
    // width: 100%;
    height: 26px;
    line-height: 26px;
}
// ::v-deep .el-tree-node {
//     margin: 0 10px;
// }
</style>
