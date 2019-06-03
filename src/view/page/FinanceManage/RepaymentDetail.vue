<template>
    <div class="card-container">
        <common-top-form :model="formModel" buttonName="导出" @add="exportInfo">
            <el-row>
                <el-form-item label="机构名称">
                    <el-select v-model="formModel.organ">
                        <el-option
                            v-for="item in organs"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item><el-form-item label="应用名称">
                    <el-select v-model="formModel.apply">
                        <el-option
                            v-for="item in applys"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="订单号">
                    <el-input v-model="formModel.orderNum" placeholder="请输入订单号"></el-input>
                </el-form-item>
            </el-row>
            <el-form-item label="变更日期">
                <el-date-picker
                    v-model="formModel.time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
        </common-top-form>
        <common-table :data="tableData">
            <el-table-column prop="tatName" label="机构名称" width="160"></el-table-column>
            <el-table-column prop="appName" label="应用名称"></el-table-column>
            <el-table-column prop="updateTime" label="变动时间" width="160"></el-table-column>
            <el-table-column prop="money" label="变动金额"></el-table-column>
            <el-table-column prop="reduce" label="变动后余额"></el-table-column>
            <el-table-column prop="order" label="订单号" width="160"></el-table-column>
            <el-table-column prop="content" label="备注"></el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'

    export default {
        name: "RepaymentDetail",
        components: {
            CommonTopForm, CommonTable
        },
        data() {
            return {
                formModel: {
                    organ: '',
                    apply:'',
                    orderNum:'',
                    time: ''
                },
                organs: [{
                    value: '',
                    label: ''
                }],
                applys: [{
                    value: '',
                    label: ''
                }],
                tableData: [{
                    tatName: '一码智能版',
                    appName: '一码智能版',
                    updateTime: '2019-04-05 12:13:14',
                    reduce: '1000000',
                    money: '1000000',
                    order: '1000000',
                    content: '赏你的',
                }],
            }
        },
        methods:{
            exportInfo(){

            },
        }
    }
</script>

<style scoped>

</style>
