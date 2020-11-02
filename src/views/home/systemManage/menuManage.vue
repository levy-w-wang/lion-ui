<!-- 菜单管理 -->
<template>
    <div>
        <el-row class="custom-tree-node"
                style="padding-left: 40px;background-color: #9b9b9b;">
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
                <span>逻辑删除</span>
            </el-col>
            <el-col :span="1">
                <span>排序</span>
            </el-col>
            <el-col :span="3">
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
                <el-col :span="1">
                    <span>{{data.orderIndex}}</span>
                </el-col>
                <el-col :span="3">
                    <span v-if="data.childMenus.length <= 0">
                        按钮控制个数 {{data.buttonPerms.length}}
                        <el-button type="text"
                                   class="btn_edit"
                                   @click="btnPermsInfo(data)">查看</el-button>
                    </span>
                </el-col>
                <el-col :span="3">
                    <el-button type="text"
                               class="btn_add"
                               @click="addMenu(data)">新增</el-button>
                    <el-button type="text"
                               class="btn_edit"
                               @click="updateMenu(data,node)">编辑</el-button>
                    <el-button type="text"
                               class="btn_delete"
                               @click="deleteMenu(data,node)">删除</el-button>
                </el-col>
            </el-row>
        </el-tree>
        <el-button type="primary"
                   @click="addMenu(null,null)">新增</el-button>
        <el-button @click="getCheckedNodes">通过 node 获取</el-button>
        <el-button @click="getCheckedKeys">通过 key 获取</el-button>

        <el-drawer title="菜单按钮信息"
                   :visible.sync="drawerButton"
                   direction="rtl">
            <div class="drawer_wrapper">
                <div>
                    <h3>页面ID：</h3><span>{{currentPage.menuId}}</span>
                </div>
                <div>
                    <h3>页面名称：</h3><span>{{currentPage.menuName}}</span>
                </div>
                <el-table :data="currentPage.buttonPerms"
                          style="width: 100%">
                    <el-table-column prop="menuId"
                                     label="按钮ID">
                    </el-table-column>

                    <el-table-column prop="menuName"
                                     label="按钮名称">
                    </el-table-column>
                    <el-table-column prop="deleted"
                                     label="逻辑删除"
                                     width="100">
                        <template slot-scope="scope">{{scope.row.deleted}}</template>
                    </el-table-column>
                    <el-table-column label="操作"
                                     width="120">
                        <template slot-scope="scope">
                            <el-button type="text"
                                       class="btn_edit"
                                       @click="updateMenu(scope.row,null)">编辑</el-button>
                            <el-button type="text"
                                       class="btn_delete"
                                       @click="deleteButtonPerm(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="flex:1;display:flex;">
                    <el-button type="primary"
                               style="margin-left:auto"
                               @click="addButtonPerm()">新增</el-button>
                </div>
            </div>
        </el-drawer>
        <el-dialog title="权限控制"
                   :close-on-click-modal="false"
                   :visible.sync="permDialogVisible"
                   width="600px">
            <el-form :model="operatePerm"
                     label-width="80px"
                     label-position="left">
                <div class="perm_warpper">
                    <el-form-item label="资源ID:">
                        <el-input v-model="operatePerm.menuId"
                                  :disabled="isUpdate"
                                  placeholder="菜单按钮ID"></el-input>
                    </el-form-item>
                    <el-form-item label="资源名称:">
                        <el-input v-model="operatePerm.menuName"
                                  placeholder="资源名称"></el-input>
                    </el-form-item>
                </div>
                <div class="perm_warpper"
                     v-show="!isButton">
                    <el-form-item label="资源路径:">
                        <el-input v-model="operatePerm.url"
                                  placeholder="页面才需要"></el-input>
                    </el-form-item>
                    <el-form-item label="图标:">
                        <el-input v-model="operatePerm.icon"
                                  placeholder="需要"></el-input>
                    </el-form-item>
                </div>
                <div class="perm_warpper">
                    <el-form-item label="父级ID:">
                        <el-input v-model="operatePerm.parentMenuId"
                                  disabled
                                  placeholder="父级ID"></el-input>
                    </el-form-item>
                    <el-form-item label="层级:">
                        <el-input v-model.number="operatePerm.level"
                                  disabled
                                  placeholder="层级"></el-input>
                    </el-form-item>
                </div>
                <div class="perm_warpper">
                    <el-form-item label="删除标志:">
                        <el-checkbox v-model="operatePerm.deleted"
                                     style="width: 190px;">逻辑删除</el-checkbox>
                    </el-form-item>
                    <el-form-item label="排序索引:"
                                  v-show="!isButton">
                        <el-input v-model.number="operatePerm.orderIndex"
                                  placeholder="排序索引"></el-input>
                    </el-form-item>
                </div>
                <div class="perm_warpper">
                    <el-form-item label="分配使用:">
                        <el-select v-model="operatePerm.assignAdmin"
                                   style="width: 190px;"
                                   placeholder="默认不操作">
                            <el-option label="不操作"
                                       value="1">
                            </el-option>
                            <el-option label="分配"
                                       value="2">
                            </el-option>
                            <el-option label="取消分配"
                                       value="3">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer">
                <el-button @click="permDialogVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="permSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
let id = 1000;
export default {
    data () {
        return {
            menuTree: null,
            permDialogVisible: false,
            drawerButton: false,
            isButton: false,
            isUpdate: false,
            currentPage: {},
            currentNode: null,
            operatePerm: {
                isUpdate: false,
                assignAdmin: "1",
            },
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
            console.log(row);
            this.currentPage = row;
        },
        addButtonPerm () {
            this.isButton = true;
            this.isUpdate = false;
            this.operatePerm = {
                parentMenuId: this.currentPage.menuId,
                type: 2,
                deleted: false,
                orderIndex: 0,
                menuId: this.currentPage.menuId.replace('M', 'B') + '_XXX',
            }
            this.permDialogVisible = true;
        },
        addMenu (data, node) {
            this.isButton = false;
            this.isUpdate = false;
            this.operatePerm = {
                parentMenuId: '',
                type: 1,
                level: 1,
                deleted: false,
                orderIndex: 0,
                menuId: '',
            }
            if (data) {
                console.log(data);
                this.operatePerm.parentMenuId = data.menuId
                this.operatePerm.level = data.level + 1
                this.operatePerm.menuId = data.menuId + 'xx'
            }
            // const newChild = { menuId: id++, menuName: 'testtest', children: [] };
            // if (!data.children) {
            //     this.$set(data, 'children', []);
            // }
            // data.children.push(newChild);
            this.permDialogVisible = true;
        },
        updateMenu (data, node) {
            console.log(data);
            this.isButton = node == null;
            this.isUpdate = true;
            this.operatePerm = data;
            this.operatePerm.isUpdate = true;
            this.permDialogVisible = true;
        },
        deleteMenu (data, node) {
            console.log(node)
            console.log(data)
            // const parent = node.parent;
            // const children = parent.data.children || parent.data;
            // const index = children.findIndex(d => d.menuId === data.menuId);
            // children.splice(index, 1);
        },
        permSubmit () {
            console.log(this.operatePerm)
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
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 14px;
    height: 26px;
    line-height: 26px;
}
::v-deep .el-drawer__header {
    margin-bottom: 15px;
}
.perm_warpper {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    div:nth-of-type(2) {
        margin-left: 20px;
    }
}
.drawer_wrapper {
    padding: 10px;
    h3 {
        display: inline-block;
    }
}
// ::v-deep .el-tree-node {
//     margin: 0 10px;
// }
</style>
