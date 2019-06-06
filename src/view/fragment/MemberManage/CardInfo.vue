<template>
    <div>
        <p class="commonTitle">信用卡</p>
        <common-table :data="creditData" :isShow="false" class="creditTable">
            <el-table-column prop="cardId" label="卡编号"></el-table-column>
            <el-table-column prop="cardNum" label="信用卡卡号"></el-table-column>
            <el-table-column prop="bank" label="所属银行"></el-table-column>
            <el-table-column prop="name" label="持卡人姓名"></el-table-column>
            <el-table-column prop="addTime" label="卡添加时间"></el-table-column>
            <el-table-column prop="status" label="卡状态"></el-table-column>
            <el-table-column prop="day" label="账单日"></el-table-column>
            <el-table-column prop="lastDay" label="最后还款日"></el-table-column>
            <el-table-column prop="num" label="计划数量"></el-table-column>
        </common-table>
        <p class="commonTitle">储蓄卡</p>
        <common-table :data="saveData" :isShow="false">
            <el-table-column prop="name" label="持卡人姓名"></el-table-column>
            <el-table-column prop="cardNum" label="银行卡卡号"></el-table-column>
            <el-table-column prop="bank" label="银行名称"></el-table-column>
            <el-table-column prop="bankInfo" label="银行信息"></el-table-column>
            <el-table-column prop="addTime" label="添加时间"></el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTable from 'components/common/CommonTable'

    export default {
        name: "CardInfo",
        components: {
            CommonTable
        },
        data() {
            return {
                creditData: [{
                    cardId: '54313',
                    cardNum: '54564654132132',
                    bank: 'D0',
                    name: '东东',
                    addTime: '2019-02-16 15:20:30',
                    status: '正常',
                    day: '26',
                    lastDay: '16',
                    num: '100',
                }],
                saveData: [{
                    name: '赵小花',
                    cardNum: '1111111111111111111',
                    bank: '银行银行银行',
                    bankInfo: '儿童复古养家糊口了而退哦怕法国红酒看来',
                    addTime: '2019-02-16 15:20:30',
                }]
            }
        },

    }
</script>

<style scoped>
    .creditTable {
        margin-bottom: 30px;
    }
</style>
