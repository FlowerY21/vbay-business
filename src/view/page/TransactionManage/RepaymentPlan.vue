<template>
    <div class="card-container">
        <common-top-form :model="formModel"  @openAddDialog="exportInfo()" buttonName="导出">
            <el-form-item label="商户户名">
                <el-input v-model="formModel.name"></el-input>
            </el-form-item>
            <el-form-item label="卡号">
                <el-input v-model="formModel.card"></el-input>
            </el-form-item>
            <el-form-item label="代付流水号">
                <el-input v-model="formModel.paynum"></el-input>
            </el-form-item>
            <el-form-item label="机构流水号">
                <el-input v-model="formModel.organnum"></el-input>
            </el-form-item>
            <el-form-item label="付款状态">
                <el-select v-model="formModel.state">
                    <el-option
                        v-for="item in formModel.states"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代付通道">
                <el-select v-model="formModel.channel">
                    <el-option
                        v-for="item in formModel.channels"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属机构">
                <el-select v-model="formModel.organ">
                    <el-option
                        v-for="item in formModel.organs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="付款时间">
                <el-date-picker
                    v-model="formModel.payTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
        </common-top-form>
        <common-table  :data="tableData" :showSummary="true" :tableClass = "true">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="id" label="还款计划单ID" width="160"></el-table-column>
            <el-table-column prop="card" label="信用卡号" width="160"></el-table-column>
            <el-table-column prop="bank" label="所属银行" width="160"></el-table-column>
            <el-table-column prop="name" label="持卡人姓名" width="160"></el-table-column>
            <el-table-column prop="account" label="所属用户账号" width="160"></el-table-column>
            <el-table-column prop="num" label="卡编号" width="160"></el-table-column>
            <el-table-column prop="total" label="计划总金额" width="160"></el-table-column>
            <el-table-column prop="service" label="服务费" width="160"></el-table-column>
            <el-table-column prop="pay" label="代付费" width="160"></el-table-column>
            <el-table-column prop="discount" label="优惠金额" width="160"></el-table-column>
            <el-table-column prop="used" label="已使用优惠金额" width="160"></el-table-column>
            <el-table-column prop="days" label="任务天数" width="160"></el-table-column>
            <el-table-column prop="state" label="计划状态" width="160"></el-table-column>
            <el-table-column prop="createTime" label="计划创建时间" width="160"></el-table-column>
            <el-table-column prop="consumed" label="已消费/预计笔数" width="160"></el-table-column>
            <el-table-column prop="reimbursement" label="已还款/预计笔数" width="160"></el-table-column>
            <el-table-column prop="content" label="备注"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="infoDetail(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'

    export default {
        name: "RepaymentPlan",
        components: {
            CommonTopForm, CommonTable
        },
        data() {
            return {
                formModel: {
                    name: '',
                    card: '',
                    paynum: '',
                    organnum: '',
                    state: '',
                    states: [{
                        value: '',
                        label: ''
                    }],
                    channel: '',
                    channels: [{
                        value: '',
                        label: ''
                    }],
                    organ: '',
                    organs: [{
                        value: '',
                        label: ''
                    }],
                    payTime: ''
                },
                tableData:[{
                    id:'a',
                    card:'b',
                    bank:'c',
                    name:'d',
                    account:'e',
                    num:'123',
                    total:'12',
                    service:'12',
                    pay:'12',
                    discount:'11',
                    used:'11',
                    days:'5',
                    state:'1',
                    createTime:'n',
                    consumed:'o',
                    reimbursement:'p',
                    content:'q',
                }],

            }
        },
        methods:{
            exportInfo(){

            },
            infoDetail(id){
                this.$router.push({
                    name:'plandetails',
                    params:{
                        id:id
                    }
                })
            },

        }

    }
</script>

<style scoped>

</style>
