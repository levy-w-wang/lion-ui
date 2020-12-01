<!-- 任务模态框 -->
<template>
    <el-dialog title="添加任务"
               :visible.sync="dialogVisible"
               width="700px">
        <el-form :model="taskData"
                 label-width="100px"
                 ref="taskData">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="组名:"
                                  prop="jobGroup"
                                  :rules="[{ required: true, message: '组名必需输入', trigger: 'blur' }]">
                        <el-input v-model.trim="taskData.jobGroup"
                                  maxlength="70"
                                  show-word-limit
                                  placeholder="组名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="任务名:"
                                  :rules="[{ required: true, message: '任务名必需输入', trigger: 'blur' }]"
                                  prop="jobName">
                        <el-input v-model.trim="taskData.jobName"
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
                        <el-input v-model.trim="taskData.description"
                                  maxlength="120"
                                  show-word-limit
                                  placeholder="该任务描述"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="邮件提醒:"
                                  prop="mailMessage">
                        <el-select v-model="taskData.mailMessage">
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
                        <el-input v-model.trim="taskData.requestUrl"
                                  placeholder="请求的URL地址"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="请求方式:"
                                  prop="requestType">
                        <el-select v-model="taskData.requestType">
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
                            <el-date-picker v-model="taskData.beginTime"
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
                            <el-date-picker v-model="taskData.endTime"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            value-format="yyyy-MM-ddTHH:mm:ss"
                                            type="datetime"
                                            placeholder="选择结束日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="taskData.triggerType == 1">
                <el-col :span="12">
                    <el-form-item label="Cron:"
                                  :rules="[{ required: true, message: 'Cron表达式必需输入', trigger: 'blur' }]"
                                  prop="cron">
                        <el-input v-model.trim="taskData.cron"
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
            <el-row v-if="taskData.triggerType == 2">
                <el-col :span="12">
                    <el-form-item label="重复间隔:"
                                  :rules="[{ required: true, message: '重复间隔必需输入', trigger: 'blur' }]"
                                  prop="intervalSecond">
                        <el-input-number v-model="taskData.intervalSecond"
                                         controls-position="right"
                                         placeholder="每多少秒执行一次"
                                         :min="1"
                                         :max="2147483646"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="重复次数:"
                                  prop="runTimes">
                        <el-input-number v-model="taskData.runTimes"
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
                        <el-input v-model.trim="taskData.headers"
                                  placeholder="请求头参数，json格式转字段"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="请求参数:"
                                  prop="requestParameters">
                        <el-input v-model.trim="taskData.requestParameters"
                                  placeholder="请求Body参数"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer">
            <el-button @click="resetTask">取 消</el-button>
            <el-button type="primary"
                       @click="submitTask">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        task_form: {
            required: true,
            type: Object
        },
        dialog_visible: {
            default: false,
            type: Boolean,
        },
        is_add: {
            default: true,
            type: Boolean,
        }
    },
    data () {
        return {
        };
    },
    //引入组件 
    components: {},
    // 方法
    methods: {
        resetTask () {
            this.dialogVisible = false
            this.taskData = {
                mailMessage: 0,
                jobType: 1,//任务类型
                triggerType: 1,//触发器类型
            }
        },
        submitTask () {
            //TODO
            //             this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         this.dialogVisible = false;
            //         console.log(this.taskData)
            //         this.$api.quartz.addJob(this.taskData).then(data => {
            //             console.log(data)
            //             if (data && data.success) {
            //                 this.search();
            //                 this.$message({
            //                     type: 'success',
            //                     message: '添加成功'
            //                 })
            //                 setTimeout(() => {
            //                     this.$refs[formName].resetFields();
            //                 }, 500);
            //             }
            //             else {
            //                 this.$message(data.message || "添加失败")
            //             }
            //         })
            //     } else {
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });
            this.dialogVisible = false
            this.$emit('submitTask')
        }
    },
    // 计算属性  
    computed: {
        taskData: {
            get () {
                return this.task_form
            },
            set (val) {
                this.$emit("update:task_form", val)
            }
        },
        dialogVisible: {
            get () {
                console.log(this.dialog_visible);
                return this.dialog_visible
            },
            set (val) {
                console.log(val);
                this.$emit("update:dialog_visible", val)
            }
        },
        dialogTitle () {
            return this.is_add ? '增加任务' : '修改任务'
        }
    },
    created () { },
    mounted () { }
}

</script>
<style lang='scss' scoped>
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