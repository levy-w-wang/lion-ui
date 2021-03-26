<!-- 菜单管理 -->
<template>
    <div>
        <el-row class="custom-tree-node"
                style="padding-left: 40px;background-color: #d7f8f5;">
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
                    <el-button type="text"
                               class="btn_edit"
                               @click="assignMenu(data,true)">分配</el-button>
                    <el-button type="text"
                               class="btn_delete"
                               @click="assignMenu(data,false)">取消分配</el-button>
                </el-col>
            </el-row>
        </el-tree>
        <el-button type="primary"
                   @click="addMenu()">新增</el-button>

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
                                     width="200">
                        <template slot-scope="scope">
                            <el-button type="text"
                                       class="btn_edit"
                                       @click="updateMenu(scope.row,null)">编辑</el-button>
                            <el-button type="text"
                                       class="btn_delete"
                                       @click="deleteButtonPerm(scope.row)">删除</el-button>
                            <el-button type="text"
                                       class="btn_edit"
                                       @click="assignMenu(scope.row,true)">分配</el-button>
                            <el-button type="text"
                                       class="btn_delete"
                                       @click="assignMenu(scope.row,false)">取消分配</el-button>
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
                   width="600px"
                   :show-close="false">
            <el-form :model="operatePerm"
                     label-width="80px"
                     label-position="left">
                <div class="perm_warpper">
                    <el-form-item label="资源ID:">
                        <el-input v-model.trim="operatePerm.menuId"
                                  :disabled="isUpdate"
                                  placeholder="菜单按钮ID"></el-input>
                    </el-form-item>
                    <el-form-item label="资源名称:">
                        <el-input v-model.trim="operatePerm.menuName"
                                  placeholder="资源名称,权限分配时显示"></el-input>
                    </el-form-item>
                </div>
                <div class="perm_warpper">
                    <el-form-item label="资源路径:">
                        <el-input v-model.trim="operatePerm.url"
                                  style="width: 190px;"
                                  placeholder="页面路径、权限控制标识"></el-input>
                    </el-form-item>
                    <el-form-item label="图标:"
                                  v-show="!isButton">
                        <el-input v-model.trim="operatePerm.icon"
                                  placeholder="需要"></el-input>
                    </el-form-item>
                </div>
                <div class="perm_warpper">
                    <el-form-item label="父级ID:">
                        <el-input v-model.trim="operatePerm.parentMenuId"
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
            </el-form>
            <div slot="footer">
                <el-button @click="permDialogClose">取 消</el-button>
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
            menuTree: [],
            permDialogVisible: false,
            drawerButton: false,
            isButton: false,
            isUpdate: false,
            currentPage: {},
            currentData: null,
            operateType: -1, // 1添加按钮 2添加页面 3更新按钮 4更新页面  5删除按钮 6删除页面
            operatePerm: {
                isUpdate: false,
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
            this.currentPage = row;
        },
        addButtonPerm () {
            this.operateType = 1;
            this.isButton = true;
            this.operatePerm = {
                parentMenuId: this.currentPage.menuId,
                type: 2,
                deleted: false,
                orderIndex: 0,
                menuId: this.currentPage.menuId.replace('M', 'B') + '_XXX',
            }
            this.permDialogVisible = true;
        },
        deleteButtonPerm (data) {
            this.$confirm('此操作将永久删除该按钮权限，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.menu.deleteMenu(data.menuId).then(res => {
                    if (res.code == 200) {
                        this.$message.success("删除成功");
                        var buttonPerms = this.currentPage.buttonPerms;
                        const index = buttonPerms.findIndex(d => d.menuId === data.menuId);
                        buttonPerms.splice(index, 1);
                    }
                })
            }).catch(() => { });
        },
        addMenu (data) {
            this.operateType = 2;
            this.operatePerm = {
                parentMenuId: '',
                type: 1,
                level: 1,
                deleted: false,
                orderIndex: 0,
                menuId: 'Mx',
                buttonPerms: [],
                childMenus: []
            }
            if (data) {
                this.currentData = data;
                this.operatePerm.parentMenuId = data.menuId
                this.operatePerm.level = data.level + 1
                this.operatePerm.menuId = data.menuId + 'xx'
            }
            this.permDialogVisible = true;
        },
        updateMenu (data, node) {
            this.operateType = node == null ? 3 : 4
            this.isButton = node == null;
            this.isUpdate = true;
            this.operatePerm = data;
            this.operatePerm.isUpdate = true;
            this.permDialogVisible = true;
        },
        deleteMenu (data, node) {
            this.$confirm(`此操作将永久删除该菜单[${data.menuId}]，请先确保它没有子菜单, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (data.buttonPerms.length > 0 || data.childMenus.length > 0) {
                    this.$message.warning("还存在按钮权限或页面未删除，请先删除");
                }
                else {
                    this.$api.menu.deleteMenu(data.menuId).then(res => {
                        if (res.code == 200) {
                            this.$message.success("删除成功");
                            const parent = node.parent;
                            const children = parent.data.childMenus || parent.data;
                            const index = children.findIndex(d => d.menuId === data.menuId);
                            children.splice(index, 1);
                        }
                    })
                }
            }).catch(() => { });
        },
        permSubmit () {
            this.$api.menu.addmenu(this.operatePerm).then(res => {
                if (res.code == 200) {
                    // 1添加按钮 2添加页面 3更新按钮 4更新页面
                    switch (this.operateType) {
                        case 1:
                            this.currentPage.buttonPerms.push(this.operatePerm);
                            break;
                        case 2:
                            const newChild = this.operatePerm;
                            let data = this.currentData;
                            if (!data) {
                                data = this.menuTree;
                                data.push(newChild);
                            }
                            else {
                                if (!data.childMenus) {
                                    this.$set(data, 'childMenus', []);
                                }
                                data.childMenus.push(newChild);
                            }
                            break;
                        default:
                            break;
                    }
                    this.permDialogVisible = false;
                    this.$message.success("操作成功")
                    this.isButton = false;
                    this.isUpdate = false;
                }
            })
        },
        permDialogClose () {
            this.permDialogVisible = false
            setTimeout(() => {
                this.isButton = false;
                this.isUpdate = false;
            }, 500);
        },
        assignMenu (row, flag) {
            let notifyMessage = flag ? `是否确认将当前菜单[${row.menuId}]及其子菜单分配给非系统管理员使用？` : `是否确认将当前菜单[${row.menuId}]及其子菜单取消分配给非系统管理员使用权限？`
            this.$confirm(notifyMessage, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let menuIdList = [];
                this.getMenuId(row, menuIdList);
                this.$api.menu.assignMenu({ menuIdList: menuIdList, type: flag }).then(res => {
                    if (res.code == 200) {
                        this.$message.success("操作成功")
                    }
                })
            }).catch(() => { });
        },
        getMenuId (data, list) {
            list.push(data.menuId);
            if (data.buttonPerms && data.buttonPerms.length > 0) {
                data.buttonPerms.forEach(button => {
                    this.getMenuId(button, list);
                });
            }
            if (data.childMenus && data.childMenus.length > 0) {
                data.childMenus.forEach(menu => {
                    this.getMenuId(menu, list);
                });
            }
        }
    },
    computed: {
    },
    created () {
        this.$api.menu.getMenuManage().then(res => {
            if (res.code == 200) {
                this.menuTree = res.data
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
::v-deep .el-tree-node__content:hover {
    background-color: #fcf8bd;
    // color: #000;
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
