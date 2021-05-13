<!-- 任务日志 -->
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
                        <div style="margin-left: 35px;">
                            <el-button type="primary"
                                       size="small"
                                       @click="search">搜索</el-button>
                            <el-button type="info"
                                       size="small"
                                       @click="resetSearch('search_form')">重置</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <!-- 数据展示表格 -->
        <el-table :data="tableData"
                  stripe>
            <el-table-column label="组名"
                             prop="jobGroup">
            </el-table-column>
            <el-table-column prop="jobName"
                             label="任务名">
            </el-table-column>
            <el-table-column label="任务描述"
                             prop="description">
            </el-table-column>
            <el-table-column label="上次执行时间"
                             width="140"
                             prop="previousFireTime">
            </el-table-column>
            <el-table-column label="下次执行时间"
                             width="140"
                             prop="nextFireTime">
            </el-table-column>
            <el-table-column label="耗时"
                             width="120"
                             prop="runTimeTotalMilliseconds">
                <template slot-scope="scope">{{scope.row.runTimeTotalMilliseconds}}ms</template>
            </el-table-column>
            <el-table-column label="请求地址"
                             prop="requestPath">
            </el-table-column>
            <el-table-column label="请求数据"
                             prop="jobDataMap">
                <template slot-scope="scope"
                          v-if="scope.row.jobDataMap">
                    <span v-if="scope.row.jobDataMap.length <= 200">
                        {{scope.row.jobDataMap}}
                    </span>
                    <el-popover placement="left"
                                v-else
                                width="600"
                                trigger="click">
                        <div style="width:600px;max-height:350px;overflow-y:auto;">
                            {{scope.row.jobDataMap}}
                        </div>
                        <el-button type="text"
                                   slot="reference">点击查看请求数据</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="响应结果"
                             prop="result">
                <template slot-scope="scope"
                          v-if="scope.row.result">
                    <span v-if="scope.row.result.length <= 200">
                        {{scope.row.result}}
                    </span>
                    <el-popover placement="left"
                                v-else
                                width="600"
                                trigger="click">
                        <div style="width:600px;max-height:350px;overflow-y:auto;">
                            {{scope.row.result}}
                        </div>
                        <el-button type="text"
                                   slot="reference">点击查看响应结果</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="异常信息"
                             prop="exception">
                <template slot-scope="scope"
                          v-if="scope.row.exception">
                    <span v-if="scope.row.exception.length <= 200">
                        {{scope.row.exception}}
                    </span>
                    <el-popover placement="left"
                                v-else
                                width="600"
                                trigger="click">
                        <div style="width:600px;max-height:600px;overflow-y:auto;">
                            {{scope.row.exception}}
                        </div>
                        <el-button type="text"
                                   slot="reference">点击查看异常信息</el-button>
                    </el-popover>
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
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [],
            total: 0,
            search_form: {
                currentPage: 1,
                pageSize: 20,
                group: "",
                name: "",
                description: "",
            },
        };
    },
    //引入组件
    components: {
    },
    // 方法
    methods: {
        /**查询 */
        search () {
            this.$api.quartzlog.taskLogList(this.search_form).then(res => {
                if (res && res.success) {
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
        /**重置查询框 */
        resetSearch (formName) {
            this.$refs[formName].resetFields();
        },

    },
    // 计算属性
    computed: {},
    created () { },
    mounted () {
        this.search()
    }
};
</script>
<style lang="scss" scoped>
</style>
