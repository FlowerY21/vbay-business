<template>
    <div class="fundsDetail">
        <common-table :data="tableData">
            <el-table-column prop="id" label="内部流水号"></el-table-column>
            <el-table-column prop="creditCard" label="卡编号"></el-table-column>
            <el-table-column prop="bank" label="订单类型"></el-table-column>
            <el-table-column prop="cardNum" label="订单金额"></el-table-column>
            <el-table-column prop="total" label="交易服务费"></el-table-column>
            <el-table-column prop="service" label="通道手续费"></el-table-column>
            <el-table-column prop="fee" label="总利润"></el-table-column>
            <el-table-column prop="preferential" label="用户分润"></el-table-column>
            <el-table-column prop="used" label="代理分润"></el-table-column>
            <el-table-column prop="days" label="平台利润"></el-table-column>
            <el-table-column prop="status" label="银行名称"></el-table-column>
            <el-table-column prop="creatTime" label="卡号" width="160"></el-table-column>
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
