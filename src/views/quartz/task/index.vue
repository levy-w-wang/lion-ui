<!-- 任务管理 -->
<template>
    <div>
        <!-- 调度控制栏 -->
        <el-row class="search-area">
            <el-col :span="3"
                    style="text-align:center">
                <el-button v-if="scheduleState"
                           @click="stopSchedule"
                           type="warning">暂停调度</el-button>
                <el-button v-else
                           @click="startSchedule"
                           type="success">开始调度</el-button>
            </el-col>
            <el-col :span="10"
                    class="add-task-wrapper"
                    :offset="1">
                <span>任务类型: </span>
                <el-select v-model="task_form.jobType"
                           placeholder="job方式">
                    <el-option label="Http"
                               :value=1>
                    </el-option>
                    <el-option label="Assembly"
                               :value=2>
                    </el-option>
                </el-select>
                <span class="add-task-second-span">触发器类型: </span>
                <el-select v-model="task_form.triggerType"
                           placeholder="触发器方式">
                    <el-option label="Cron"
                               :value=1>
                    </el-option>
                    <el-option label="Simple"
                               :value=2>
                    </el-option>
                </el-select>
                <el-button type="primary"
                           class="add-task-button"
                           @click="showTaskDialog(true)">添加任务</el-button>
            </el-col>
        </el-row>
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
                                           :key="item.key"
                                           :label="item.value"
                                           :value="item.key">
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
            </el-form>
        </div>

        <!-- 数据展示表格 -->
        <el-table :data="tableData"
                  stripe>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left"
                             inline
                             class="task-table-expand">
                        <el-form-item label="任务开始时间:">
                            <span>{{ props.row.beginTime }}</span>
                        </el-form-item>
                        <el-form-item label="任务结束时间:">
                            <span>{{ props.row.endTime }}</span>
                        </el-form-item>
                        <el-form-item label="请求参数:">
                            <span>{{ props.row.requestParameters }}</span>
                        </el-form-item>
                        <el-form-item label="请求头:"
                                      v-if="props.row.jobType == 1">
                            <span>{{ props.row.headers }}</span>
                        </el-form-item>
                        <el-form-item label="执行优先级:">
                            <span>{{ props.row.priority }}</span>
                        </el-form-item>
                        <el-form-item label="是否邮件通知:">
                            <span>{{ getMailMessageStr(props.row.mailMessage) }}</span>
                        </el-form-item>
                        <el-form-item label="邮件通知:"
                                      v-if="props.row.mailMessage != 0">
                            <span>{{ props.row.notifyEmail }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间:">
                            <span>{{ props.row.createdTime }}</span>
                        </el-form-item>
                    </el-form>
                    <el-divider></el-divider>
                </template>
            </el-table-column>
            <el-table-column label="组名"
                             prop="jobGroup">
            </el-table-column>
            <el-table-column prop="jobName"
                             label="任务名">
            </el-table-column>
            <el-table-column label="任务描述"
                             prop="description">
            </el-table-column>
            <el-table-column label="任务状态"
                             width="80">
                <template slot-scope="scope">
                    <span :class='`triggerState-color-${scope.row.triggerState}`'>
                        {{getTriggerStateStr(scope.row.triggerState)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="请求地址"
                             prop="requestPath">
            </el-table-column>
            <el-table-column label="请求方法"
                             prop="requestMethod">
            </el-table-column>
            <el-table-column label="请求间隔"
                             width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.jobType == 2">
                        {{scope.row.cron}}
                    </span>
                    <span v-else>
                        {{`每${scope.row.intervalSecond}s一次`}}
                        <br />
                        {{`共${scope.row.intervalSecond+1}次`}}
                        <!-- 加上本身的一次 -->
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="上次执行时间"
                             width="140"
                             prop="previousFireTime">
            </el-table-column>
            <el-table-column label="下次执行时间"
                             width="140"
                             prop="nextFireTime">
            </el-table-column>
            <el-table-column label="操作"
                             min-width="115">
                <template slot-scope="scope">
                    <el-button size="mini"
                               v-if="[0,3,4].includes(scope.row.triggerState)"
                               type="primary"
                               @click="handleStopJob(scope.row,scope.$index)">暂停</el-button>
                    <el-button size="mini"
                               v-if="scope.row.triggerState == 1"
                               type="success"
                               @click="handleResumeJob(scope.row,scope.$index)">恢复</el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="handleRemoveJob(scope.row,scope.$index)">删除</el-button>
                    <el-button size="mini"
                               type="warning"
                               @click="handleModifyJob(scope.row,scope.$index)">修改</el-button>
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

        <task-dialog :task_form.sync="task_form"
                     :dialog_visible.sync="dialogVisible"
                     :is_add="isAddTask"
                     @submitTask="submitTask"></task-dialog>
    </div>
</template>

<script>
import TaskDialog from './components/TaskDialog'
const triggerStateMap = [
    { key: null, value: '全部' },
    { key: 0, value: '正常' },
    { key: 1, value: '暂停' },
    { key: 2, value: '完成' },
    { key: 3, value: '异常' },
    { key: 4, value: '阻塞' },
    { key: 5, value: '已删除' },
]
export default {
    data () {
        return {
            scheduleState: true,//false 为暂停 true 为运行
            tableData: [],
            total: 0,
            search_form: {
                currentPage: 1,
                pageSize: 20,
                group: "",
                name: "",
                description: "",
                triggerState: null
            },
            triggerState: triggerStateMap,
            dialogVisible: false,
            isAddTask: true,
            //triggerType: None = 0, Cron = 1, Simple = 2,
            task_form: {
                mailMessage: 0,
                jobType: 1,//任务类型
                triggerType: 1,//触发器类型
                description: '册谔谔谔'
            },
        };
    },
    //引入组件
    components: {
        TaskDialog
    },
    // 方法
    methods: {
        /**查询 */
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
        /**获取任务状态字符描述 */
        getTriggerStateStr (state) {
            let stateObj = this.triggerState.find(s => s.key == state)
            if (stateObj) {
                return stateObj.value;
            }
            return '未知'
        },
        /**获取任务状态字符描述 */
        getMailMessageStr (mailMessage) {
            switch (mailMessage) {
                case 0:
                    return "不通知"
                    break;
                case 1:
                    return "错误通知"
                    break;
                case 2:
                    return "全量通知"
                    break;
                default:
                    return "未知"
            }
        },
        /**显示task模态框 */
        showTaskDialog (is_add) {
            this.dialogVisible = true
            this.isAddTask = is_add
        },
        /**重置查询框 */
        resetSearch (formName) {
            this.$refs[formName].resetFields();
        },
        submitTask () {
            console.log(this.task_form);
        },
        /**获取调度状态 */
        getScheduleState () {
            this.$api.quartz.getScheduleState().then(res => {
                if (res && res.success) {
                    this.scheduleState = res.data
                }
            })
        },
        /** 开始 */
        startSchedule () {
            this.$api.quartz.startSchedule().then(res => {
                if (res && res.success) {
                    this.scheduleState = res.data
                }
            })
        },
        /** 暂停 */
        stopSchedule () {
            this.$api.quartz.stopSchedule().then(res => {
                if (res && res.success) {
                    this.scheduleState = res.data
                }
            })
        },
        handleStopJob (row, index) {
            this.$api.quartz.stopJob({ name: row.jobName, group: row.jobGroup }).then(data => {
                if (data && data.success) {
                    this.$message({
                        type: 'success',
                        message: '暂停成功'
                    })
                    this.search();
                }
            })
        },
        handleResumeJob (row, index) {
            this.$api.quartz.resumeJob({ name: row.jobName, group: row.jobGroup }).then(data => {
                if (data && data.success) {
                    this.$message({
                        type: 'success',
                        message: '恢复成功'
                    })
                    this.search();
                }
            })
        },
        handleRemoveJob (row, index) {
            this.$api.quartz.removeJob({ name: row.jobName, group: row.jobGroup }).then(data => {
                if (data && data.success) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.search();
                }
            })
        },
        handleModifyJob (row, index) {
            this.task_form = Object.assign({}, row)
            this.showTaskDialog(false)
        },
    },
    // 计算属性
    computed: {},
    created () {
        this.getScheduleState()
    },
    mounted () {
        this.search()
    }
};
</script>
<style lang="scss" scoped>
.search-area {
    .form-column {
        display: flex;
    }
}

.add-task-wrapper {
    display: flex;
    align-items: center;
    .el-select {
        margin-left: 5px;
        width: 120px;
    }
    .add-task-second-span {
        margin-left: 15px;
    }
    .add-task-button {
        margin-left: 15px;
    }
}

.task-table-expand {
    font-size: 0;
    label {
        width: 90px;
        color: #99a9bf;
    }
    .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
}

.triggerState-color-0 {
    color: #909399;
}
.triggerState-color-1 {
    color: #e6a23c;
}
.triggerState-color-2 {
    color: #67c23a;
}
.triggerState-color-3 {
    color: #f56c6c;
}
.triggerState-color-4 {
    color: #f5dbb3;
}
.triggerState-color-5 {
    color: #d90f0f;
}
</style>
