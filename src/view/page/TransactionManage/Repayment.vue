<template>
    <div class="card-container">
        <common-top-form :model="formModel"  @openAddDialog="exportInfo()" buttonName="导出">
            <el-form-item label="订单ID">
                <el-input v-model="formModel.id"></el-input>
            </el-form-item>
            <el-form-item label="机构名称">
                <el-select v-model="formModel.name">
                    <el-option
                        v-for="item in formModel.names"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="通道名称">
                <el-select v-model="formModel.channel">
                    <el-option
                        v-for="item in formModel.channels"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="结算方式：">
                <el-select v-model="formModel.settle">
                    <el-option
                        v-for="item in formModel.settles"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支付方式">
                <el-select v-model="formModel.type">
                    <el-option
                        v-for="item in formModel.types"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单状态">
                <el-select v-model="formModel.state">
                    <el-option
                        v-for="item in formModel.states"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支付时间">
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
            <el-table-column prop="id" label="订单ID" width="160"></el-table-column>
            <el-table-column prop="name" label="所属机构名称" width="160"></el-table-column>
            <el-table-column prop="apply" label="所属机构应用" width="160"></el-table-column>
            <el-table-column prop="channel" label="所属渠道名称" width="160"></el-table-column>
            <el-table-column prop="business" label="所属商户名称" width="160"></el-table-column>
            <el-table-column prop="pay" label="支付方式" width="160"></el-table-column>
            <el-table-column prop="money" label="订单金额" width="160"></el-table-column>
            <el-table-column prop="num" label="代付金额" width="160"></el-table-column>
            <el-table-column prop="service" label="平台服务费" width="160"></el-table-column>
            <el-table-column prop="fee" label="通道手续费" width="160"></el-table-column>
            <el-table-column prop="state" label="订单状态" width="160"></el-table-column>
            <el-table-column prop="paytime" label="支付时间" width="160"></el-table-column>
            <el-table-column prop="card" label="渠道交易号" width="160"></el-table-column>
            <el-table-column prop="code" label="返回码" width="160"></el-table-column>
            <el-table-column prop="mode" label="结算方式" width="160"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="reissueNotice(scope.row)">补发通知</el-button>
                </template>
            </el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'

    export default {
        name: "Repayment",
        components: {
            CommonTopForm, CommonTable
        },
        data() {
            return {
                formModel: {
                    id:'',
                    name: '',
                    names: [{
                        value: '',
                        label: ''
                    }],
                    channel: '',
                    channels: [{
                        value: '',
                        label: ''
                    }],
                    settle: '',
                    settles: [{
                        value: '',
                        label: ''
                    }],
                    type: '',
                    types: [{
                        value: '',
                        label: ''
                    }],
                    state: '',
                    states: [{
                        value: '',
                        label: ''
                    }],
                    payTime: ''
                },
                tableData:[{
                    id:'123443',
                    name:'一码智能版',
                    apply:'一码智能版',
                    channel:'通联还款',
                    business:'江南春大冷面',
                    pay:'快捷',
                    money:'123',
                    num:'22',
                    service:'2',
                    fee:'2',
                    state:'支付成功',
                    paytime:'2090520',
                    card:'0102344',
                    code:'SUCC',
                    mode:'T0',
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
