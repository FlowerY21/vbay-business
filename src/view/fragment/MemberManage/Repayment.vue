<template>
    <div class="fundsDetail">
        <common-table :data="tableData">
            <el-table-column prop="id" label="还款计划单ID"></el-table-column>
            <el-table-column prop="creditCard" label="信用卡号"></el-table-column>
            <el-table-column prop="bank" label="所属银行"></el-table-column>
            <el-table-column prop="cardNum" label="卡编号"></el-table-column>
            <el-table-column prop="total" label="计划总金额"></el-table-column>
            <el-table-column prop="service" label="服务费"></el-table-column>
            <el-table-column prop="fee" label="代付费"></el-table-column>
            <el-table-column prop="preferential" label="优惠金额"></el-table-column>
            <el-table-column prop="used" label="已使用优惠金额" width="160"></el-table-column>
            <el-table-column prop="days" label="任务天数"></el-table-column>
            <el-table-column prop="status" label="计划状态"></el-table-column>
            <el-table-column prop="creatTime" label="计划创建时间"></el-table-column>
            <el-table-column prop="consumed" label="已消费/预计"></el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTable from 'components/common/CommonTable'

    export default {
        name: "Repayment",
        data() {
            return {
                tableData: [{
                    id:'',
                    creditCard:'',
                    bank:'',
                    cardNum:'',
                    total:'',
                    service:'',
                    fee:'',
                    preferential:'',
                    used:'',
                    days:'',
                    status:'',
                    creatTime:'',
                    consumed:'',
                }],
            }
        },
        components: {
            CommonTable
        },
    }
</script>

<style scoped>

</style>
