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
                <el-input v-model="formModel.payNum"></el-input>
            </el-form-item>
            <el-form-item label="机构流水号">
                <el-input v-model="formModel.organNum"></el-input>
            </el-form-item>
            <el-form-item label="付款状态">
                <el-select v-model="formModel.state">
                    <el-option
                        v-for="item in states"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代付通道">
                <el-select v-model="formModel.channel">
                    <el-option
                        v-for="item in channels"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属机构">
                <el-select v-model="formModel.Affiliate">
                    <el-option
                        v-for="item in Affiliates"
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
        <common-table  :data="tableData">
            <el-table-column prop="channel" label="付款通道" width="160"></el-table-column>
            <el-table-column prop="payNum" label="代付流水号" width="160"></el-table-column>
            <el-table-column prop="organNum" label="机构流水号" width="160"></el-table-column>
            <el-table-column prop="apply" label="所属应用" width="160"></el-table-column>
            <el-table-column prop="name" label="商户户名" width="160"></el-table-column>
            <el-table-column prop="card" label="结算卡号" width="160"></el-table-column>
            <el-table-column prop="type" label="卡类型" width="160"></el-table-column>
            <el-table-column prop="cardNum" label="联行号" width="160"></el-table-column>
            <el-table-column prop="bankName" label="支行名称" width="160"></el-table-column>
            <el-table-column prop="payMoney" label="代付金额" width="160"></el-table-column>
            <el-table-column prop="fee" label="手续费" width="160"></el-table-column>
            <el-table-column prop="money" label="到账金额" width="160"></el-table-column>
            <el-table-column prop="state" label="付款状态" width="160"></el-table-column>
            <el-table-column prop="code" label="应答码" width="160"></el-table-column>
            <el-table-column prop="payTime" label="代付时间" width="160"></el-table-column>
            <el-table-column label="收益详情">
                <template slot-scope="scope">
                    <el-button type="text" @click="reissueNotice(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'

    export default {
        name: "QuickCollection",
        components: {
            CommonTopForm, CommonTable
        },
        data() {
            return {
                channels: [{
                    value: '',
                    label: ''
                }],
                states: [{
                    value: '',
                    label: ''
                }],
                Affiliates: [{
                    value: '',
                    label: ''
                }],
                formModel: {
                    name: '',
                    card: '',
                    payNum: '',
                    organNum: '',
                    state: '',
                    channel:'',
                    Affiliate:'',
                    payTime: ''
                },
                tableData:[{
                    channel:'荣宝',
                    payNum:'1231233',
                    organNum:'543546456',
                    apply:'一码',
                    name:'姜爱妮',
                    card:'622344',
                    type:'储蓄卡',
                    cardNum:'23432',
                    bankName:'上帝支行',
                    payMoney:'123',
                    fee:'2',
                    money:'121',
                    state:'支付成功',
                    code:'SUCC',
                    payTime:'2019-5-21',

                }],

            }
        },
        methods:{
            exportInfo(){

            },
            reissueNotice(id){

            },

        }

    }
</script>

<style scoped>

</style>
