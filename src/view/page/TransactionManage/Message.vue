<template>
    <div class="card-container">
        <common-top-form :model="formModel" @openAddDialog="exportInfo()" >
            <el-row>

                <el-form-item label="短信内容">
                    <el-select v-model="formModel.note">
                        <el-option
                            v-for="item in notes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="机构名称">
                    <el-select v-model="formModel.organ">
                        <el-option
                            v-for="item in organs"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发送范围">
                    <el-select v-model="formModel.area">
                        <el-option
                            v-for="item in areas"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-form-item label="发送时间">
                <el-date-picker
                    v-model="formModel.sendTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
        </common-top-form>
        <common-table :data="tableData">
            <el-table-column prop="channel" label="机构名称" width="160"></el-table-column>
            <el-table-column prop="note" label="短信内容" ></el-table-column>
            <el-table-column prop="area" label="推送范围"></el-table-column>
            <el-table-column prop="num" label="短信数量" ></el-table-column>
            <el-table-column prop="name" label="发布人" ></el-table-column>
            <el-table-column prop="time" label="卡类型间" width="160"></el-table-column>
            <el-table-column prop="state" label="状态"></el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="text" @click="reissueNotice(scope.row)">详情</el-button>
                    <el-button type="text" class="button-color">禁用</el-button>
                </template>
            </el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'

    export default {
        name: "Message",
        components: {
            CommonTopForm, CommonTable
        },
        data() {
            return {
                notes: [{
                    value: '',
                    label: ''
                }],
                organs: [{
                    value: '',
                    label: ''
                }],
                areas: [{
                    value: '',
                    label: ''
                }],
                formModel: {
                    note:'',
                    organ:'',
                    area:'',
                    payTime: ''
                },
                tableData: [{
                    channel: '一码',
                    note:'阿萨德加咖啡',
                    area:'指定用户',
                    num:'863322',
                    name:'张三丰',
                    time:'2019-03-14 10:31:22',
                    state:'启用',
                }],

            }
        },
        methods: {
            exportInfo() {

            },
            reissueNotice(id) {

            },

        }

    }
</script>

<style scoped>

</style>
