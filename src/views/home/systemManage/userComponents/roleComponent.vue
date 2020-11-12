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
            </el-table-column>
            <el-table-column label="角色描述"
                             prop="roleDesc">
            </el-table-column>
            <el-table-column label="关联用户">
                <template slot-scope="scope"
                          v-if="scope.row.userNames">
                    {{scope.row.userNames.join(',')}}
                </template>
            </el-table-column>
            <el-table-column label="操作"
                             align="right">
                <template slot-scope="scope">
                    <el-button size="mini"
                               v-perms="'u_edit'"
                               v-if="scope.row.roleId != '1' && scope.row.roleId != '2'"
                               @click="handleEdit(scope.$index, scope.row)">配置权限</el-button>
                    <el-button size="mini"
                               v-perms="'u_edit'"
                               v-if="scope.row.roleId != '1' && scope.row.roleId != '2'"
                               @click="handleEdit(scope.$index, scope.row)">关联用户</el-button>
                    <el-button size="mini"
                               v-perms="'u_edit'"
                               v-if="scope.row.roleId != '1' && scope.row.roleId != '2'"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini"
                               v-perms="'u_delete'"
                               v-if="scope.row.roleId != '1' && scope.row.roleId != '2'"
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

        <el-dialog :title="addRole ?'新增角色':'编辑角色'"
                   :visible.sync="dialogVisible"
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
                    <el-input type="text"
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
            dialogVisible: false,
            roleData: {},
            tableData: [],
        };
    },
    //引入组件 
    components: {},
    // 方法
    methods: {
        searchData () {
            console.log(this.searchForm);
            console.log(this.$store.getters.userInfo);
            this.$api.role.rolePage(this.searchForm).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.data
                    this.total = res.data.recordTotal
                    this.searchForm.currentPage = res.data.currentPage
                    this.searchForm.pageSize = res.data.pageSize
                }
                console.log(res);
            })
        },
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
        handleDelete (index, row) {
            console.log(index, row);
            this.$confirm('<font style="font-size: 18px;color:#324057;">确定删除该用户？<font></br><font  style="font-size: 14px;color:#324057;">删除后该角色下所有用户将解除关联，为保证正常使用，请及时将用户关联角色</font>', "删除提醒", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                dangerouslyUseHTMLString: true,
                type: "warning"
            }).then(() => {
                this.$api.role.removeRole(row.roleId).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message.success('删除成功')
                        this.tableData.splice(index, 1)
                    }
                })
            }).catch(() => { this.$message.info('已取消删除') })
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.addRole) {
                        this.$api.role.addRole(this.roleData).then(res => {
                            console.log(res);
                            if (res.code == 200) {
                                this.dialogVisible = false
                                this.searchData()
                                this.resetForm(formName)
                            }
                        })
                    }
                    else {
                        this.$api.role.modifuRole(this.roleData).then(res => {
                            console.log(res);
                            if (res.code == 200) {
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
    computed: {},
    //未挂载DOM,不能访问ref为空数组
    //可在这结束loading，还做一些初始化，实现函数自执行,
    //可以对data数据进行操作，可进行一些请求，请求不易过多，避免白屏时间太长。
    created () {
        this.searchData();
    },
    //可在这发起后端请求，拿回数据，配合路由钩子做一些事情；可对DOM 进行操作
    mounted () { }
}

</script>
<style lang='scss' scoped>
</style>