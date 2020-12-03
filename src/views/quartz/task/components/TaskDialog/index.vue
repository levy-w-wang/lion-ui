<!-- 任务模态框 -->
<template>
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisible"
               width="700px"
               :close-on-click-modal="false"
               :show-close="false">
        <el-dialog width="700px"
                   title="参数配置"
                   :visible.sync="innerDialogVisible"
                   :close-on-click-modal="false"
                   :show-close="false"
                   append-to-body>
            <div class="inner-dialog-wrapper">
                <el-button type="primary"
                           @click="addItem">新增参数</el-button>
                <el-form :model="dynamicDic"
                         ref="dynamicDic"
                         label-width="60px">
                    <el-row v-for="(item, index) in dynamicDic.dynamicKvArray"
                            :key="index">
                        <el-col :span="9">
                            <el-form-item label="key"
                                          :prop="'dynamicKvArray.' + index + '.key'"
                                          :rules="[{ required: true, message: '请输入key', trigger: 'blur' },{validator:validateRepeatKey,trigger: 'blur' }]">
                                <el-input v-model.trim="item.key"
                                          maxlength="20"
                                          show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="value"
                                          :prop="'dynamicKvArray.' + index + '.value'"
                                          :rules="{ required: true, message: 'value', trigger: 'blur' }">
                                <el-input v-model.trim="item.value"
                                          maxlength="120"
                                          show-word-limit>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2"
                                :offset="1">
                            <el-button @click.prevent="removedynamicKv(item)">删除</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

            <div slot="footer">
                <el-button @click="innerDialogVisible=false">取消</el-button>
                <el-button type="primary"
                           @click="submitDynamicDic()">保存</el-button>
            </div>
        </el-dialog>
        <el-form :model="taskData"
                 label-width="100px"
                 ref="taskData">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="任务类型:"
                                  prop="jobType"
                                  :rules="[{ required: true, message: '任务类型必选', trigger: 'blur' }]">
                        <el-select v-model="taskData.jobType"
                                   placeholder="job方式">
                            <el-option label="Http"
                                       :value=1>
                            </el-option>
                            <el-option label="Assembly"
                                       :value=2>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="触发器类型:"
                                  prop="triggerType"
                                  :rules="[{ required: true, message: '触发器方式必选', trigger: 'blur' }]">
                        <el-select v-model="taskData.triggerType"
                                   placeholder="触发器方式">
                            <el-option label="Cron"
                                       :value=1>
                            </el-option>
                            <el-option label="Simple"
                                       :value=2>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-tabs type="card"
                     v-model="activeTabName">
                <el-tab-pane label="任务配置"
                             name="task">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="组名:"
                                          prop="jobGroup"
                                          :rules="[{ required: true, message: '组名必需输入', trigger: 'blur' }]">
                                <el-input v-model.trim="taskData.jobGroup"
                                          maxlength="50"
                                          show-word-limit
                                          placeholder="组名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="任务名:"
                                          :rules="[{ required: true, message: '任务名必需输入', trigger: 'blur' }]"
                                          prop="jobName">
                                <el-input v-model.trim="taskData.jobName"
                                          maxlength="50"
                                          show-word-limit
                                          placeholder="任务名"></el-input>
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
                            <el-form-item label="任务优先级:"
                                          :rules="[{ required: true, message: '任务优先级必需输入', trigger: 'blur' }]"
                                          prop="intervalSecond">
                                <el-input-number v-model="taskData.priority"
                                                 controls-position="right"
                                                 :min="1"
                                                 :max="20"></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="taskData.jobType == 1">
                        <el-col :span="12">
                            <el-form-item label="请求地址:"
                                          :rules="[{ required: true, message: '请求地址必需输入', trigger: 'blur' }]"
                                          prop="requestUrl">
                                <el-input v-model.trim="taskData.requestPath"
                                          maxlength="56"
                                          show-word-limit
                                          placeholder="请求的URL地址"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="请求方式:"
                                          prop="requestType"
                                          :rules="{required: true, message: '请求方式必选', trigger: 'blur' }">
                                <el-select v-model="taskData.requestMethod">
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
                    <el-row v-if="taskData.jobType == 2">
                        <el-col :span="12">
                            <el-form-item label="项目名称:"
                                          :rules="[{ required: true, message: '请求地址必需输入', trigger: 'blur' }]"
                                          prop="requestPath">
                                <el-input v-model.trim="taskData.requestPath"
                                          maxlength="56"
                                          show-word-limit
                                          placeholder="请求的项目名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="请求路径:"
                                          :rules="[{ required: true, message: '请求地址必需输入', trigger: 'blur' }]"
                                          prop="requestMethod">
                                <el-input v-model.trim="taskData.requestMethod"
                                          maxlength="40"
                                          show-word-limit
                                          placeholder="请求Job完整路径,不包括项目名"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="开始日期:"
                                          prop="beginTime"
                                          :rules="{required: true, message: '开始日期必选', trigger: 'blur' }">
                                <div class="block">
                                    <el-date-picker v-model="taskData.beginTime"
                                                    format="yyyy-MM-dd HH:mm:ss"
                                                    value-format="yyyy-MM-dd HH:mm:ss"
                                                    type="datetime"
                                                    placeholder="选择开始日期">
                                    </el-date-picker>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="结束日期:"
                                          :rules="{required: true, message: '结束日期必选', trigger: 'blur' }"
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
                            <el-form-item>
                                <el-link href="https://cron.qqe2.com/"
                                         style="color:#409EFF"
                                         target="_blank">Cron参考地址</el-link>
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
                                          :rules="[{ required: true, message: '重复间隔必需输入', trigger: 'blur' }]"
                                          prop="runTimes">
                                <el-input-number v-model="taskData.runTimes"
                                                 controls-position="right"
                                                 placeholder="默认有一次，重复多少次数"
                                                 :min="0"
                                                 :max="2147483646"></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="请求头:"
                                          prop="headers">
                                <el-input v-model.trim="taskData.headers"
                                          maxlength="256"
                                          show-word-limit
                                          :disabled="true"
                                          placeholder="请求头参数，json格式转字段">
                                    <template slot="append">
                                        <el-button type="primary"
                                                   @click="configTaskData('headers')">设置</el-button>
                                    </template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="请求参数:"
                                          prop="requestParameters">
                                <el-input v-model.trim="taskData.requestParameters"
                                          maxlength="512"
                                          show-word-limit
                                          :disabled="true"
                                          placeholder="请求Body参数">
                                    <template slot="append">
                                        <el-button type="success"
                                                   @click="configTaskData('requestParameters')">设置</el-button>
                                    </template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="邮箱配置"
                             name="email">
                    <el-row>
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
                                    <el-option label="全量通知"
                                               :value=2>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
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
            activeTabName: 'task',
            innerDialogVisible: false,
            innerDialogTitle: '',
            dynamicDic: {
                type: '',
                dynamicKvArray: [],
            },
            validateRepeatKey: (rule, value, callback) => {
                const repeatData = this.dynamicDic.dynamicKvArray.filter(ele => ele.key == value)
                console.log(repeatData);
                if (repeatData.length > 1) {
                    callback(new Error(`已存在${value},请勿重复设置`));
                } else {
                    callback();
                }
            }
        };
    },
    //引入组件 
    components: {},
    // 方法
    methods: {
        //配置任务请求头 或 请求参数
        configTaskData (type) {
            this.dynamicDic.type = type
            if (type == 'requestParameters') {
                let object = JSON.parse(this.taskData.requestParameters)
                this.dynamicDic.dynamicKvArray = this.$objectHelper.toKvArray(object);
            }
            else {
                let object = JSON.parse(this.taskData.headers)
                this.dynamicDic.dynamicKvArray = this.$objectHelper.toKvArray(object);
            }
            this.innerDialogVisible = true
        },
        // 移除某一个参数
        removedynamicKv (item) {
            var index = this.dynamicDic.dynamicKvArray.indexOf(item)
            if (index !== -1) {
                this.dynamicDic.dynamicKvArray.splice(index, 1)
            }
        },
        // 添加一个参数
        addItem () {
            this.dynamicDic.dynamicKvArray.push({
                key: '',
                value: '',
            });
        },
        //设置当前动态参数
        submitDynamicDic () {
            this.$refs['dynamicDic'].validate((valid) => {
                if (valid) {
                    let dic = this.$objectHelper.toMap(this.dynamicDic.dynamicKvArray)
                    if (this.dynamicDic.type == 'requestParameters') {
                        this.taskData.requestParameters = JSON.stringify(dic)
                    }
                    else {
                        this.taskData.headers = JSON.stringify(dic)
                    }
                    this.innerDialogVisible = false
                } else {
                    return false;
                }
            });
        },
        resetTask () {
            this.dialogVisible = false
            this.activeTabName = 'task'
            this.taskData = {
                mailMessage: 0,
                jobType: 1,// 任务类型
                triggerType: 1,// 触发器类型
                priority: 5,// 默认优先级5
                requestParameters: "{}",
                headers: "{}",
            }
        },
        submitTask () {
            this.$refs['taskData'].validate((valid) => {
                if (valid) {
                    this.dialogVisible = false
                    this.activeTabName = 'task'
                    this.$emit('submitTask')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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
                return this.dialog_visible
            },
            set (val) {
                this.$emit("update:dialog_visible", val)
            }
        },
        dialogTitle () {
            return this.is_add ? '添加任务' : '修改任务'
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
::v-deep .el-dialog__body {
    padding: 0 20px 10px;
}
.inner-dialog-wrapper {
    .el-form {
        margin-top: 10px;
        border: 1px;
    }
}
</style>