<!-- 用户管理-添加用户等 -->
<template>
    <div>
        <div class="top-div-button">
            <el-button type="primary"
                       @click="dialogVisible = true">新增用户</el-button>
        </div>
        <el-form :inline="true"
                 :model="searchForm"
                 class="demo-form-inline search-form">
            <el-form-item label="用户名">
                <el-input v-model="searchForm.user"
                          placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="searchForm.phone"
                          placeholder="手机号">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData"
                  style="width: 100%">
            <el-table-column label="日期"
                             width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="姓名"
                             width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover"
                                placement="top">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div slot="reference"
                             class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作"
                             align="right">
                <template slot-scope="scope">
                    <el-button size="mini"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini"
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
                   width="25%">
            <el-form :model="userData"
                     ref="userDataForm"
                     label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="姓名"
                              prop="name"
                              :rules="[{ required: true, message: '姓名不能为空'},]">
                    <el-input type="text"
                              v-model="userData.name"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址"
                              prop="address"
                              :rules="[{ required: true, message: '地址不能为空'},]">
                    <el-input type="text"
                              v-model="userData.address"
                              autocomplete="off"></el-input>
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
            total: 100,
            searchForm: {
                currentPage: 1,
                pageSize: 20,
                user: '',
                phone: ''
            },
            dialogVisible: false,
            userData: {
                date: '2018-08-16',
                name: '',
                address: ''
            },
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
        };
    },
    //引入组件 
    components: {},
    // 方法
    methods: {
        onSubmit () {
            this.searchData()
        },
        searchData () {
            console.log(this.searchForm);
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
    created () { },
    //可在这发起后端请求，拿回数据，配合路由钩子做一些事情；可对DOM 进行操作
    mounted () { }
}

</script>
<style lang='scss' scoped>
</style>