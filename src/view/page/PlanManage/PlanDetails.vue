<template>
    <div class="card-container">
        <el-row class="flow-justify">
            <el-col class="plan-label">
                <p>还款计划单ID：<span>{{notice.id}}</span></p>
                <p>预计消费笔款：<span>{{notice.estimateConsumed}}</span></p>
                <p>预计还款笔数：<span>{{notice.estimatereimbursement}}</span></p>
            </el-col>
            <el-col class="plan-label">
                <p>计划总金额（元）：<span>{{notice.total}}</span></p>
                <p>已消费笔款：<span>{{notice.consumed}}</span></p>
                <p>已还款笔数：<span>{{notice.reimbursement}}</span></p>
            </el-col>
            <el-col class="plan-label">
                <p>计划状态：<span>{{notice.state}}</span></p>
                <p>已消费金额：<span>{{notice.consumedNum}}</span></p>
                <p>已还款金额：<span>{{notice.reimbursementNum}}</span></p>
            </el-col>
        </el-row>

        <common-table  :data="tableData">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="type" label="任务类型" width="160"></el-table-column>
            <el-table-column prop="money" label="交易金额" width="160"></el-table-column>
            <el-table-column prop="num" label="任务流水号" width="160"></el-table-column>
            <el-table-column prop="expectdate" label="预计执行日期" width="160"></el-table-column>
            <el-table-column prop="expecttime" label="预计执行时间" width="160"></el-table-column>
            <el-table-column prop="state" label="任务状态" width="160"></el-table-column>
            <el-table-column prop="trade" label="消费行业" width="160"></el-table-column>
            <el-table-column prop="time" label="实际执行时间" width="160"></el-table-column>
            <el-table-column prop="content" label="备注"></el-table-column>
        </common-table>
    </div>
</template>

<script>

    import CommonTable from 'components/common/CommonTable'
    export default {
        name: "PlanDetails",
        data(){
            return{
                notice:{
                    id:'123456789',
                    total:'12345.00',
                    state:'进行中',
                    estimateConsumed:'6',
                    consumed:'0',
                    consumedNum:'0.00',
                    estimatereimbursement:'3',
                    reimbursement:'0',
                    reimbursementNum:'0.00',
                },
                tableData:[{
                    type:'消费',
                    money:'2378.00',
                    num:'123456789',
                    expectdate:'20190520',
                    expecttime:'20190520',
                    state:'进行中',
                    trade:'其他',
                    time:'20190520',
                    content:'aaa',
                }]
            }
        },
        components:{
            CommonTable
        },
        mounted(){
            console.log(this.$route.params.id)
        },

    }
</script>

<style scoped>
    .plan-label{
        padding-left: 10%;
    }
    .plan-label p{
        margin: 10px 0 20px;
    }
    .plan-label p span{
        color:rgba(170, 170, 170, 1);
    }
</style>
