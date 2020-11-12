<!-- 用户管理-添加用户等 -->
<template>
    <div>
        <div class="top-div-button">
            <el-button type="primary"
                       v-perms="'u_add'"
                       @click="dialogVisible = true">新增用户</el-button>
        </div>
        <el-form :inline="true"
                 :model="searchForm"
                 class="demo-form-inline search-form">
            <el-form-item label="用户名:">
                <el-input v-model="searchForm.userName"
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
            <el-table-column label="登录名"
                             prop="userName">
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
                           :page.sync="searchForm.currentPage"
                           :limit.sync="searchForm.pageSize"
                           @pagination="searchData">
            <el-button type="success">测试按钮</el-button>
        </pagination-footer>

        <el-dialog title="新增用户"
                   :visible.sync="dialogVisible"
                   width="420px">
            <el-form :model="userData"
                     label-position="right"
                     ref="userDataForm"
                     label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="登录名："
                              prop="name"
                              :rules="[{ required: true, message: '登录名不能为空'},]">
                    <el-input type="text"
                              v-model="userData.userName"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱："
                              prop="email"
                              :rules="[{ required: true, message: '邮箱不能为空'},]">
                    <el-input type="text"
                              v-model="userData.email"
                              placeholder="找回密码的邮箱"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="登录密码："
                              prop="pwd"
                              :rules="[{ required: true, message: '密码不能为空'},]">
                    <el-input type="text"
                              v-model="userData.pwd"
                              autocomplete="off"></el-input>
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
                        <!-- <el-option v-for="item in options"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option> -->
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
            total: 0,
            searchForm: {
                currentPage: 1,
                pageSize: 20,
                userName: null,
                email: null
            },
            dialogVisible: false,
            userData: {
                date: '2018-08-16',
                name: '',
                address: ''
            },
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
            this.$api.user.userList(this.searchForm.pageSize, this.searchForm.currentPage, this.searchForm).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.data
                    this.total = res.data.recordTotal
                    this.searchForm.currentPage = res.data.currentPage
                    this.searchForm.pageSize = res.data.pageSize
                }
                console.log(res);
            })
        },
        roleNameStr (roleNames) {
            if (roleNames instanceof Array) {
                return roleNames.join(',')
            }
            return ''
        },
        handleEdit (index, row) {
            console.log(index, row);
        },
        handleDelete (index, row) {
            console.log(index, row);
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let tempUser = Object.assign({}, this.userData)//只会拷贝一层  多层结构请使用深拷贝 （如序列化与反序列化）
                    this.tableData.push(tempUser)
                    this.resetForm(formName)
                    this.dialogVisible = false
                } else {
                    console.log('error submit!!');
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