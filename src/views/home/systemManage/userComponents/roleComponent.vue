<!-- 用户管理-添加用户等 -->
<template>
    <div>
        <div class="top-div-button">
            <el-button type="primary"
                       v-perms="'r_add'"
                       @click="()=>{dialogVisible = true,addRole = true}">新增角色</el-button>
        </div>
        <el-form :inline="true"
                 :model="searchForm"
                 class="demo-form-inline search-form">
            <el-form-item label="角色名称:">
                <el-input v-model="searchForm.roleName"
                          placeholder="角色名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData"
                  style="width: 100%;min-height:450px">
            <el-table-column label="序号"
                             align="center"
                             type="index"
                             width="50">
            </el-table-column>
            <el-table-column label="角色名称"
                             prop="roleName">
                <template slot-scope="scope">
                    <el-button type="text"
                               @click="()=>{getRoleMenu(scope.row),hasPermsDialogVisible = true}"
                               style="color:#409eff">
                        {{scope.row.roleName}}
                    </el-button>
                </template>

            </el-table-column>
            <el-table-column label="角色描述"
                             prop="roleDesc">
            </el-table-column>
            <el-table-column label="关联用户">
                <template slot-scope="scope"
                          v-if="scope.row.nickNames">
                    {{scope.row.nickNames.join(',')}}
                </template>
            </el-table-column>
            <el-table-column label="操作"
                             align="right">
                <template slot-scope="scope">
                    <el-button size="mini"
                               v-perms="'r_perms_config'"
                               v-if="currentRoleIds.indexOf(scope.row.roleId) == -1"
                               @click="handleConfigRolePerms(scope.row)">配置权限</el-button>
                    <el-button size="mini"
                               v-perms="'r_relation'"
                               v-if="currentRoleIds.indexOf(scope.row.roleId) == -1"
                               @click="handleRelation(scope.row)">关联用户</el-button>
                    <el-button size="mini"
                               v-perms="'r_edit'"
                               v-if="currentRoleIds.indexOf(scope.row.roleId) == -1"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini"
                               v-perms="'r_delete'"
                               v-if="currentRoleIds.indexOf(scope.row.roleId) == -1"
                               type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination-footer :total="total"
                           :page.sync="searchForm.currentPage"
                           :limit.sync="searchForm.pageSize"
                           @pagination="searchData">
            <!-- <el-button type="success">测试按钮</el-button> -->
        </pagination-footer>

        <!-- 角色新增&编辑 -->
        <el-dialog :title="addRole ?'新增角色':'编辑角色'"
                   :visible.sync="dialogVisible"
                   :close-on-click-modal="false"
                   width="420px">
            <el-form :model="roleData"
                     label-position="right"
                     ref="roleDataForm"
                     label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="角色名："
                              prop="roleName"
                              :rules="[{ required: true, message: '请输入角色名称',trigger: 'blur'},
                              {min: 2,max: 16,message: '长度在2到16个字符',trigger: 'blur'},]">
                    <el-input type="text"
                              v-model="roleData.roleName"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述："
                              prop="roleDesc"
                              :rules="[{max: 16,message: '长度在2到120个字符',trigger: 'blur'},]">
                    <el-input type="textarea"
                              :rows="2"
                              v-model="roleData.roleDesc"
                              placeholder="角色说明，描述等"
                              autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer"
                  class="dialog-footer">
                <el-button @click="()=>{
                    resetForm('roleDataForm')
                    dialogVisible = false                    
                    }">取 消</el-button>
                <el-button type="primary"
                           @click="submitForm('roleDataForm')">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 角色权限 -->
        <el-dialog title="角色权限"
                   width="550px"
                   :close-on-click-modal="false"
                   :visible.sync="hasPermsDialogVisible">
            <div style="margin-bottom: 15px;">当前角色名：
                <h4 style="display:contents">{{currentOpertionRole.roleName}}</h4> <span class="perms_config_desc">当前角色所拥有的权限</span>
            </div>
            <el-tree :data="currentRolePerms"
                     node-key="menuId"
                     :props="defaultProps"
                     default-expand-all>
                <span class="custom-tree-node"
                      slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span v-if="data.type == 1 && data.url != ''"
                          class="menu_type_span">
                        <el-tag size="mini"
                                type="warning">页面</el-tag>
                    </span>
                    <span v-if="data.type == 1 && data.url == ''"
                          class="menu_type_span">
                        <el-tag size="mini"
                                type="danger">目录</el-tag>
                    </span>
                    <span v-else-if="data.type == 2"
                          class="menu_type_span">
                        <el-tag size="mini"
                                type="info">按钮</el-tag>
                    </span>
                </span>
            </el-tree>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="hasPermsDialogVisible = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 配置权限 -->
        <el-dialog title="配置权限"
                   :close-on-click-modal="false"
                   :visible.sync="configPermsDialogVisible"
                   width="550px">
            <div style="margin-bottom: 15px;">当前角色名：
                <h4 style="display:contents">{{currentOpertionRole.roleName}}</h4> <span class="perms_config_desc">可以设置角色权限到具体的操作按钮</span>
            </div>
            <el-tree :data="currentMenuTreeCopy"
                     show-checkbox
                     node-key="menuId"
                     ref="configMenuTree"
                     :highlight-current="true"
                     :props="defaultProps"
                     :default-checked-keys="defaultCheckedKeys"
                     :default-expanded-keys="defaultExpandedKeys"
                     :expand-on-click-node="false">
                <span class="custom-tree-node"
                      slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span v-if="data.type == 1 && data.url != ''"
                          class="menu_type_span">
                        <el-tag size="mini"
                                type="warning">页面</el-tag>
                    </span>
                    <span v-if="data.type == 1 && data.url == ''"
                          class="menu_type_span">
                        <el-tag size="mini"
                                type="danger">目录</el-tag>
                    </span>
                    <span v-else-if="data.type == 2"
                          class="menu_type_span">
                        <el-tag size="mini"
                                type="info">按钮</el-tag>
                    </span>
                </span>
            </el-tree>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="configPermsDialogVisible = false">关闭</el-button>
                <el-button type="primary"
                           @click="submitConfigPerms">确认</el-button>
            </div>
        </el-dialog>
        <!-- 角色关联用户 -->
        <el-dialog title="关联用户"
                   :close-on-click-modal="false"
                   :visible.sync="relationUserDialogVisible"
                   width="550px">
            <div style="margin-bottom: 15px;">当前角色名：
                <h4 style="display:contents">{{currentOpertionRole.roleName}}</h4> <span class="perms_config_desc">直接勾选需要关联到的用户，然后点击保存</span>
            </div>
            <el-checkbox-group v-model="roleRelationUserIds"
                               v-if="roleRelationUser && roleRelationUser.length > 0">
                <el-checkbox v-for="(item,i) in roleRelationUser"
                             :key="i"
                             :label="item.userId">{{item.nickName}}
                </el-checkbox>
            </el-checkbox-group>
            <h3 v-else>暂无可关联的用户，请先去用户管理新增用户。</h3>
            <span slot="footer"
                  class="dialog-footer">
                <el-button @click="relationUserDialogVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="saveRelationUser()">保 存</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
export default {
    data () {
        return {
            handleRoleIndex: -1,
            addRole: false,
            total: 0,
            searchForm: {
                currentPage: 1,
                pageSize: 20,
                roleName: null,
            },
            dialogVisible: false,//新增&编辑用户对话框
            roleData: {},
            tableData: [],
            currentMenuTree: [],//当前用户拥有的菜单树权限
            currentMenuTreeCopy: [],//菜单树copy对象
            currentOpertionRole: {},//当前操作角色对象
            currentRolePerms: [],//当前角色权限数组
            defaultCheckedKeys: [],//配置默认选中keys
            defaultExpandedKeys: [],//配置默认展开keys
            hasPermsDialogVisible: false,//角色拥有权限对话框
            configPermsDialogVisible: false,//配置权限对话框
            relationUserDialogVisible: false,//关联用户对话框
            roleRelationUser: [],
            roleRelationUserIds: [],
            defaultProps: {
                children: 'childMenus',
                label: 'menuName'
            }
        };
    },
    //引入组件 
    components: {},
    // 方法
    methods: {
        /**提交权限配置 */
        submitConfigPerms () {
            let checkMenus = this.$refs.configMenuTree.getCheckedKeys().concat(this.$refs.configMenuTree.getHalfCheckedKeys()) ?? []
            var params = { roleId: this.currentOpertionRole.roleId, menuIds: checkMenus };
            this.$api.role.roleMenuModify(params).then(res => {
                if (res.code == 200) {
                    this.$message.success("配置成功")
                    this.configPermsDialogVisible = false
                }
            })
        },
        /**获取当前角色的权限 */
        getRoleMenu (row, flag = false) {
            this.currentOpertionRole = row;
            this.currentRolePerms = []
            this.$api.role.roleMenu(row.roleId).then(res => {
                if (res.code == 200) {
                    if (flag == true) {
                        let menuIds = [];
                        let expandedMenuIds = [];
                        this.getCurrentRolePermsIds(res.data, menuIds, expandedMenuIds)
                        this.$nextTick(() => {
                            this.defaultCheckedKeys = menuIds
                            this.defaultExpandedKeys = expandedMenuIds
                        })
                    }
                    else {
                        this.currentRolePerms = res.data
                    }
                }
            })
        },
        getCurrentRolePermsIds (data, ids, expandedMenuIds) {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element.childMenus && element.childMenus.length > 0) {
                    expandedMenuIds.push(element.menuId)
                    this.getCurrentRolePermsIds(element.childMenus, ids, expandedMenuIds)
                }
                else {
                    ids.push(element.menuId)
                }
            }
        },
        /**查询 */
        searchData () {
            this.$api.role.rolePage(this.searchForm).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.data
                    this.total = res.data.recordTotal
                    this.searchForm.currentPage = res.data.currentPage
                    this.searchForm.pageSize = res.data.pageSize
                }
            })
        },
        /**table配置权限 */
        handleConfigRolePerms (row) {
            this.defaultCheckedKeys = []
            this.defaultExpandedKeys = []
            // this.currentMenuTreeCopy = Object.assign([], this.currentMenuTree)
            this.currentMenuTreeCopy = JSON.parse(JSON.stringify(this.currentMenuTree))
            this.getRoleMenu(row, true)
            setTimeout(() => {
                this.configPermsDialogVisible = true
            }, 20);

        },
        /**table 关联用户 */
        handleRelation (row) {
            this.currentOpertionRole = row
            this.$api.role.roleUser(row.roleId).then(res => {
                if (res.code == 200) {
                    if (res.data.length > 0) {
                        this.roleRelationUser = res.data
                        this.roleRelationUserIds = res.data.filter(r => r.roleId > 0).map(r => r.userId)
                        this.relationUserDialogVisible = true
                    }
                    else {
                        this.$message.warning("暂无可关联的用户，请先去用户管理新增用户。")
                    }
                }
            })
        },
        /**修改角色关联用户 */
        saveRelationUser () {
            let params = { roleId: this.currentOpertionRole.roleId, userIds: this.roleRelationUserIds }
            this.$api.role.roleUserModify(params).then(res => {
                if (res.code == 200) {
                    this.$message.success("角色关联保存成功")
                    this.relationUserDialogVisible = false
                    this.searchData()
                }
            })
        },
        /**table编辑 */
        handleEdit (index, row) {
            this.handleRoleIndex = index
            this.addRole = false
            this.roleData = {
                roleName: row.roleName,
                roleId: row.roleId,
                roleDesc: row.roleDesc
            }
            this.dialogVisible = true
        },
        /**table删除 */
        handleDelete (index, row) {
            this.$confirm('<font style="font-size: 18px;color:#324057;">确定删除该角色？<font></br><font  style="font-size: 14px;color:#324057;">删除后该角色下所有用户将解除关联，为保证正常使用，请及时将用户关联角色</font>', "删除提醒", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                dangerouslyUseHTMLString: true,
                type: "warning"
            }).then(() => {
                this.$api.role.removeRole(row.roleId).then(res => {
                    if (res.code == 200) {
                        this.$message.success('删除成功')
                        this.tableData.splice(index, 1)
                    }
                })
            }).catch(() => { this.$message.info('已取消删除') })
        },
        /**新增&编辑用户取消 */
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
        /**新增&编辑用户提交 */
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.addRole) {
                        this.$api.role.addRole(this.roleData).then(res => {
                            if (res.code == 200) {
                                this.$message.success("新增角色成功")
                                this.dialogVisible = false
                                this.searchData()
                                this.resetForm(formName)
                            }
                        })
                    }
                    else {
                        this.$api.role.modifuRole(this.roleData).then(res => {
                            if (res.code == 200) {
                                this.$message.success("修改角色成功")
                                this.tableData[this.handleRoleIndex].roleDesc = this.roleData.roleDesc
                                this.tableData[this.handleRoleIndex].roleName = this.roleData.roleName
                                this.dialogVisible = false
                                this.resetForm(formName)
                            }
                        })
                    }
                } else {
                    return false;
                }
            });
        },
    },
    // 计算属性  
    computed: {
        currentRoleIds () {
            if (this.$store.getters.userInfo && this.$store.getters.userInfo.roleDtos) {
                return this.$store.getters.userInfo.roleDtos.map(r => r.roleId)
            }
            return []
        }
    },
    //未挂载DOM,不能访问ref为空数组
    //可在这结束loading，还做一些初始化，实现函数自执行,
    //可以对data数据进行操作，可进行一些请求，请求不易过多，避免白屏时间太长。
    created () {
        this.searchData();
    },
    //可在这发起后端请求，拿回数据，配合路由钩子做一些事情；可对DOM 进行操作
    mounted () {
        // this.currentMenuTree = this.$store.state.app.menuTree
        this.$api.menu.getMenuList().then(res => {
            if (res.code == 200) {
                this.currentMenuTree = res.data
            }
        })
    }
}

</script>
<style lang='scss' scoped>
.menu_type_span {
    margin-left: 20px;
}
.perms_config_desc {
    color: #97aac1;
    font-size: 12px;
    padding-left: 6px;
}
.el-dialog__body {
    padding: 20px 20px;
}
</style>