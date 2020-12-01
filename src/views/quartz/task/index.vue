<!-- 任务管理 -->
<template>
    <div>
        <!-- 查询表单 -->
        <div class="search-area">
            <el-form label-width="80px"
                     :model="search_form"
                     ref="search_form">
                <el-row>
                    <el-col :span="3">
                        <el-form-item label="组  名:"
                                      prop="group">
                            <el-input v-model="search_form.group"
                                      placeholder="以组名搜索"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="任务名:"
                                      prop="name">
                            <el-input v-model="search_form.name"
                                      placeholder="以任务名搜索"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="描  述:"
                                      prop="description">
                            <el-input v-model="search_form.description"
                                      placeholder="描述搜索"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="状  态:"
                                      prop="triggerState">
                            <el-select v-model="search_form.triggerState"
                                       placeholder="根据状态搜索">
                                <el-option v-for="item in triggerState"
                                           :key="item.value"
                                           :label="item.key"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item>
                            <el-button type="primary"
                                       size="small"
                                       @click="search">搜索</el-button>
                            <el-button type="info"
                                       size="small"
                                       @click="resetSearch('search_form')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>

                <div>
                    <el-form-item>
                        <el-dropdown>
                            <el-button type="success"
                                       size="small">
                                添加任务<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="addCronTask">Cron任务</el-dropdown-item>
                                <el-dropdown-item @click.native="addTask"
                                                  divided>简单任务</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <!-- 数据展示表格 -->
        <el-table :data="tableData"
                  stripe>
            <div slot="empty">
                <div style="font-weight: bold;font-size: 16px;">没有数据</div>
            </div>
            <el-table-column label="组名"
                             width="150"
                             prop="groupName">
            </el-table-column>
            <el-table-column prop="name"
                             width="150"
                             label="任务名">
            </el-table-column>
            <el-table-column label="任务描述"
                             width="150"
                             prop="description">
            </el-table-column>
            <el-table-column label="任务状态"
                             width="100"
                             prop="displayState">
            </el-table-column>
            <el-table-column label="请求地址"
                             prop="requestUrl">
            </el-table-column>
            <el-table-column label="请求间隔"
                             width="100"
                             prop="interval">
            </el-table-column>
            <el-table-column label="上次执行时间"
                             prop="previousFireTime">
            </el-table-column>
            <el-table-column label="下次执行时间"
                             prop="nextFireTime">
            </el-table-column>
            <el-table-column label="任务开始时间"
                             prop="beginTime">
            </el-table-column>
            <el-table-column label="任务结束时间"
                             prop="endTime">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="primary"
                               @click="handleStopJob(scope.row,scope.$index)">暂停</el-button>
                    <el-button size="mini"
                               type="success"
                               @click="handleResumeJob(scope.row,scope.$index)">恢复</el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="handleRemoveJob(scope.row,scope.$index)">删除</el-button>
                    <el-button size="mini"
                               type="warning"
                               @click="handleModifyJob(scope.row,scope.$index)">修改</el-button>
                    <!-- :disabled="compareDate(scope.row.OperationTime)" -->
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页菜单栏 -->
        <pagination-footer :total="total"
                           :page.sync="search_form.currentPage"
                           :limit.sync="search_form.pageSize"
                           @pagination="search">
            <!-- <el-button type="success">测试按钮</el-button> -->
        </pagination-footer>
        <!-- 添加任务弹窗 -->
        <el-dialog title="添加任务"
                   :visible.sync="dialogVisible"
                   width="35%">
            <el-form :model="task_form"
                     label-width="100px"
                     ref="task_form">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="组名:"
                                      prop="jobGroup"
                                      :rules="[{ required: true, message: '组名必需输入', trigger: 'blur' }]">
                            <el-input v-model.trim="task_form.jobGroup"
                                      maxlength="70"
                                      show-word-limit
                                      placeholder="组名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="任务名:"
                                      :rules="[{ required: true, message: '任务名必需输入', trigger: 'blur' }]"
                                      prop="jobName">
                            <el-input v-model.trim="task_form.jobName"
                                      maxlength="70"
                                      show-word-limit
                                      placeholder="组名+任务名请勿重复"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="任务描述:"
                                      prop="description">
                            <el-input v-model.trim="task_form.description"
                                      maxlength="120"
                                      show-word-limit
                                      placeholder="该任务描述"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="邮件提醒:"
                                      prop="mailMessage">
                            <el-select v-model="task_form.mailMessage">
                                <!-- None = 0,Err = 1,All = 2 -->
                                <el-option label="不通知"
                                           :value=0>
                                </el-option>
                                <el-option label="错误通知"
                                           :value=1>
                                </el-option>
                                <el-option label="全通知"
                                           :value=2>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="请求地址:"
                                      :rules="[{ required: true, message: '请求地址必需输入', trigger: 'blur' }]"
                                      prop="requestUrl">
                            <el-input v-model.trim="task_form.requestUrl"
                                      placeholder="请求的URL地址"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="请求方式:"
                                      prop="requestType">
                            <el-select v-model="task_form.requestType">
                                <!-- None = 0,Get = 1,Post = 2,Put = 4,Delete = 8 -->
                                <el-option label="Post"
                                           :value=2>
                                </el-option>
                                <el-option label="Get"
                                           :value=1>
                                </el-option>
                                <el-option label="Put"
                                           :value=4>
                                </el-option>
                                <el-option label="Delete"
                                           :value=8>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="开始日期:"
                                      prop="beginTime">
                            <div class="block">
                                <el-date-picker v-model="task_form.beginTime"
                                                format="yyyy-MM-dd HH:mm:ss"
                                                value-format="yyyy-MM-ddTHH:mm:ss"
                                                type="datetime"
                                                placeholder="选择开始日期">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="结束日期:"
                                      prop="endTime">
                            <div class="block">
                                <el-date-picker v-model="task_form.endTime"
                                                format="yyyy-MM-dd HH:mm:ss"
                                                value-format="yyyy-MM-ddTHH:mm:ss"
                                                type="datetime"
                                                placeholder="选择结束日期">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="task_form.triggerType == 1">
                    <el-col :span="12">
                        <el-form-item label="Cron:"
                                      :rules="[{ required: true, message: 'Cron表达式必需输入', trigger: 'blur' }]"
                                      prop="cron">
                            <el-input v-model.trim="task_form.cron"
                                      placeholder="Cron"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="表达式:">
                            <a href="https://cron.qqe2.com/"
                               target="_blank">Cron参考地址</a>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="task_form.triggerType == 2">
                    <el-col :span="12">
                        <el-form-item label="重复间隔:"
                                      :rules="[{ required: true, message: '重复间隔必需输入', trigger: 'blur' }]"
                                      prop="intervalSecond">
                            <el-input-number v-model="task_form.intervalSecond"
                                             controls-position="right"
                                             placeholder="每多少秒执行一次"
                                             :min="1"
                                             :max="2147483646"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="重复次数:"
                                      prop="runTimes">
                            <el-input-number v-model="task_form.runTimes"
                                             controls-position="right"
                                             placeholder="重复多少次数"
                                             :min="1"
                                             :max="2147483646"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="请求头:"
                                      prop="headers">
                            <el-input v-model.trim="task_form.headers"
                                      placeholder="请求头参数，json格式转字段"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="请求参数:"
                                      prop="requestParameters">
                            <el-input v-model.trim="task_form.requestParameters"
                                      placeholder="请求Body参数"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button @click="resetForm('task_form')">取 消</el-button>
                <el-button type="primary"
                           @click="submitForm('task_form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
const triggerStateMap = [
    { key: '全部', value: null },
    { key: '正常', value: 0 },
    { key: '暂停', value: 1 },
    { key: '完成', value: 2 },
    { key: '异常', value: 3 },
    { key: '阻塞', value: 4 },
    { key: '已删除', value: 5 },
]
export default {
    data () {
        return {
            tableData: [],
            total: 0,
            search_form: {
                "currentPage": 1,
                "pageSize": 20,
                "group": "",
                "name": "",
                "description": "",
                "triggerState": null
            },
            triggerState: triggerStateMap,
            dialogVisible: false,
            //triggerType: None = 0, Cron = 1, Simple = 2,
            task_form: {
                mailMessage: 0,
                triggerType: 0,
                requestType: 2,//post
                // jobName: '',
                // jobGroup: '',
                // beginTime: '',
                // endTime: '',
                // cron: '',
                // runTimes: 0,
                // intervalSecond: 0,
                // requestUrl: '',
                // requestParameters: '',
                // headers: '',
                // description: '',
            },
        };
    },
    //引入组件
    components: {},
    // 方法
    methods: {
        search () {
            console.log(this.search_form);
            this.$api.quartz.taskList(this.search_form).then(res => {
                if (res && res.success) {
                    console.log(res);
                    this.total = res.data.recordTotal
                    this.tableData = res.data.pageData;
                }
            })
        },
        addTask () {
            this.dialogVisible = true
            this.task_form.triggerType = 2
        },
        addCronTask () {
            console.log(1)
            this.task_form.triggerType = 1
            this.dialogVisible = true
        },
        resetSearch (formName) {
            this.$refs[formName].resetFields();
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.dialogVisible = false;
                    console.log(this.task_form)
                    this.$api.quartz.addJob(this.task_form).then(data => {
                        console.log(data)
                        if (data && data.success) {
                            this.search();
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            })
                            setTimeout(() => {
                                this.$refs[formName].resetFields();
                            }, 500);
                        }
                        else {
                            this.$message(data.message || "添加失败")
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.dialogVisible = false;
        },
        handleStopJob (row, index) {
            this.$api.quartz.stopJob({ name: row.name, group: row.groupName }).then(data => {
                if (data && data.success) {
                    this.$message({
                        type: 'success',
                        message: '暂停成功'
                    })
                    this.search();
                }
                else {
                    this.$message(data.message || "暂停失败")
                }
            })
        },
        handleResumeJob (row, index) {
            this.$api.quartz.resumeJob({ name: row.name, group: row.groupName }).then(data => {
                if (data && data.success) {
                    this.$message({
                        type: 'success',
                        message: '恢复成功'
                    })
                    this.search();
                }
                else {
                    this.$message(data.message || "恢复失败")
                }
            })
        },
        handleRemoveJob (row, index) {
            this.$api.quartz.removeJob({ name: row.name, group: row.groupName }).then(data => {
                if (data && data.success) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.search();
                }
                else {
                    this.$message(data.message || "删除失败")
                }
            })
        },
        handleModifyJob (row, index) {
            this.$api.quartz.resumeJob({ name: row.name, group: row.groupName }).then(data => {
                if (data && data.success) {
                    this.$message({
                        type: 'success',
                        message: '恢复成功'
                    })
                    this.search();
                }
                else {
                    this.$message(data.message || "恢复失败")
                }
            })
        },
    },
    // 计算属性
    computed: {},
    //未挂载DOM,不能访问ref为空数组
    //可在这结束loading，还做一些初始化，实现函数自执行,
    //可以对data数据进行操作，可进行一些请求，请求不易过多，避免白屏时间太长。
    created () { },
    //可在这发起后端请求，拿回数据，配合路由钩子做一些事情；可对DOM 进行操作
    mounted () {
        this.search();
    }
};
</script>
<style lang="scss" scoped>
.search-area {
    .form-column {
        display: flex;
    }
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: auto !important;
    width: fit-content !important;
}
.el-input-number {
    width: 100% !important;
}
.el-select {
    width: 100% !important;
}
</style>
