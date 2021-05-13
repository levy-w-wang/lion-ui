<!-- 用户管理-添加用户等 -->
<template>
    <div>
        <div class="top-div-button">
            <el-button type="primary"
                       v-perms="'u_add'"
                       @click="()=>{dialogVisible = true,addUser = true}">新增用户</el-button>
        </div>
        <el-form :inline="true"
                 :model="searchForm"
                 class="demo-form-inline search-form">
            <el-form-item label="用户名:">
                <el-input v-model="searchForm.nickName"
                          placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
                <el-input v-model="searchForm.email"
                          placeholder="邮箱">
                </el-input>
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
            <el-table-column label="昵称"
                             prop="nickName">
            </el-table-column>
            <el-table-column label="邮件"
                             prop="email">
            </el-table-column>
            <el-table-column label="关联角色">
                <template slot-scope="scope">
                    {{roleNameStr(scope.row.roleNames)}}
                </template>
            </el-table-column>
            <el-table-column label="操作"
                             align="right">
                <template slot-scope="scope">
                    <el-button size="mini"
                               v-perms="'u_edit'"
                               v-if="scope.row.userId != $store.getters.userInfo.userId"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini"
                               v-perms="'u_delete'"
                               v-if="scope.row.userId != $store.getters.userInfo.userId"
                               type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination-footer :total="total"
                           :page.sync="currentPage"
                           :limit.sync="pageSize"
                           @pagination="searchData">
            <!-- <el-button type="success">测试按钮</el-button> -->
        </pagination-footer>

        <el-dialog :title="addUser ? '新增用户' :'编辑用户'"
                   :visible.sync="dialogVisible"
                   :close-on-click-modal="false"
                   width="420px">
            <el-form :model="userData"
                     label-position="right"
                     ref="userDataForm"
                     label-width="100px">
                <el-form-item label="昵称："
                              prop="nickName"
                              :rules="[{ required: true, message: '昵称不能为空'},{max:30,message:'昵称1-30字符'}]">
                    <el-input type="text"
                              v-model.trim="userData.nickName"
                              placeholder="昵称"></el-input>
                </el-form-item>
                <el-form-item label="邮箱："
                              prop="email"
                              :rules="[{ required: true, message: '邮箱不能为空'},{pattern:/^[A-Za-z0-9\u4e00-\u9fa5_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message:'邮箱格式不正确'}]">
                    <el-input type="text"
                              :disabled="!addUser"
                              v-model.trim="userData.email"
                              placeholder="登录及找回密码的邮箱"></el-input>
                </el-form-item>
                <el-form-item label="登录密码："
                              v-if="addUser"
                              prop="pwd"
                              :rules="[{ required: true, message: '密码不能为空'},{pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@!%*#?&~]{6,20}/,message:'登录密码不符合规则'}]">
                    <el-input type="text"
                              v-model.trim="userData.pwd"
                              show-password></el-input>
                </el-form-item>
                <el-form-item label="角色："
                              prop="roleIds"
                              :rules="[{ required: true, message: '角色不能为空'},]">
                    <el-select v-model="userData.roleIds"
                               style="width:100%"
                               multiple
                               clearable
                               filterable
                               placeholder="请选择">
                        <el-option v-for="item in roleData"
                                   :key="item.roleId"
                                   :label="item.roleName"
                                   :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer"
                  class="dialog-footer">
                <el-button @click="()=>{
                    resetForm('userDataForm')
                    dialogVisible = false                    
                    }">取 消</el-button>
                <el-button type="primary"
                           @click="submitForm('userDataForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
export default {
    data () {
        return {
            handleUserIndex: -1,
            addUser: false,
            total: 0,
            currentPage: 1,
            pageSize: 20,
            searchForm: {
                nickName: null,
                email: null
            },
            dialogVisible: false,
            userData: {
                nickName: '',
                email: '',
                pwd: ''
            },
            tableData: [],
            roleData: [],
        };
    },
    //引入组件 
    components: {},
    // 方法
    methods: {
        searchData () {
            this.$api.user.userList(this.pageSize, this.currentPage, this.searchForm).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.pageData
                    this.total = res.data.recordTotal
                    this.currentPage = res.data.currentPage
                    this.pageSize = res.data.pageSize
                }
            })
        },
        roleNameStr (roleNames) {
            if (roleNames instanceof Array) {
                return roleNames.join(',')
            }
            return ''
        },
        handleEdit (index, row) {
            this.handleUserIndex = index
            this.addUser = false;
            this.userData = {
                userId: row.userId,
                nickName: row.nickName,
                email: row.email,
                roleIds: row.roleIds
            }
            this.dialogVisible = true
        },
        handleDelete (index, row) {
            this.$confirm('<font style="font-size: 18px;color:#324057;">确定删除该用户？<font></br><font  style="font-size: 14px;color:#324057;">删除后该用户账号将注销，请谨慎操作</font>', "删除提醒", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                dangerouslyUseHTMLString: true,
                type: "warning"
            }).then(() => {
                this.$api.user.removeUser(row.userId).then(res => {
                    if (res.code == 200) {
                        this.$message.success('删除成功')
                        this.tableData.splice(index, 1)
                    }
                })
            }).catch(() => { this.$message.info('已取消删除') })
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.addUser = false
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.addUser) {
                        this.$api.user.addUser(this.userData).then(res => {
                            if (res.code == 200) {
                                this.$message.success("新增用户成功")
                                this.resetForm(formName)
                                this.dialogVisible = false
                                this.searchData()
                            }
                        })
                    }
                    else {
                        this.$api.user.modifyUser(this.userData).then(res => {
                            if (res.code == 200) {
                                this.$message.success("修改用户成功")
                                this.searchData()
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
        getRoleData () {
            this.$api.role.canRelationRolePage().then(res => {
                if (res.code == 200) {
                    this.roleData = res.data.data
                }
            })
        }
    },
    // 计算属性  
    computed: {
    },
    //未挂载DOM,不能访问ref为空数组
    //可在这结束loading，还做一些初始化，实现函数自执行,
    //可以对data数据进行操作，可进行一些请求，请求不易过多，避免白屏时间太长。
    created () {
        this.searchData()
        this.getRoleData()
    },
    //可在这发起后端请求，拿回数据，配合路由钩子做一些事情；可对DOM 进行操作
    mounted () {
    }
}

</script>
<style lang='scss' scoped>
</style>