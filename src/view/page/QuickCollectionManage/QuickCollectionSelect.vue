<template>
    <div class="card-container">
        <common-top-form :model="formModel"  @openAddDialog="exportInfo()" buttonName="导出">
            <el-form-item label="用户账号">
                <el-input v-model="formModel.name"></el-input>
            </el-form-item>
            <el-form-item label="订单号">
                <el-input v-model="formModel.card"></el-input>
            </el-form-item>
            <el-form-item label="订单类型">
                <el-select v-model="formModel.state">
                    <el-option
                        v-for="item in formModel.states"
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
            <el-form-item label="银行卡号">
                <el-input v-model="formModel.name"></el-input>
            </el-form-item>
            <el-form-item label="代理ID">
                <el-input v-model="formModel.card"></el-input>
            </el-form-item>
            <el-form-item label="交易通道简称">
                <el-select v-model="formModel.state">
                    <el-option
                        v-for="item in formModel.states"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="持卡人姓名">
                <el-input v-model="formModel.card"></el-input>
            </el-form-item>
            <el-form-item label="订单生成时间">
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
            <el-table-column prop="id" label="用户账号" width="160"></el-table-column>
            <el-table-column prop="card" label="订单号" width="160"></el-table-column>
            <el-table-column prop="bank" label="订单类型" width="160"></el-table-column>
            <el-table-column prop="name" label="订单金额" width="160"></el-table-column>
            <el-table-column prop="account" label="优惠金额" width="160"></el-table-column>
            <el-table-column prop="num" label="交易服务费" width="160"></el-table-column>
            <el-table-column prop="total" label="通道手续费" width="160"></el-table-column>
            <el-table-column prop="service" label="收益详情" width="160">
                <template slot-scope="scope">
                    <el-button type="text" @click="infoDetail(scope.row)">详情</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="pay" label="卡号" width="160"></el-table-column>
            <el-table-column prop="discount" label="持卡人" width="160"></el-table-column>
            <el-table-column prop="used" label="订单状态" width="160"></el-table-column>
            <el-table-column prop="days" label="订单生成时间" width="160"></el-table-column>
            <el-table-column prop="state" label="交易通道" width="160"></el-table-column>
            <el-table-column prop="createTime" label="生成时间" width="160"></el-table-column>
        </common-table>
        <form-dialog ref="formDialog" :formDialogTitle="formDialogTitle" :rules="dialogRules"
                     @success="dialogSuccess" @close="dialogClose" @opend="dialogOpen" class="note">

        </form-dialog>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'
    import FormDialog from '../../dialog/FormDialog'

    export default {
        name: "QuickCollectionSelect",
        components: {
            CommonTopForm, CommonTable,FormDialog
        },
        data() {
            return {
                formModel: {

                },
                tableData:[],

            }
        },
        methods:{
            infoDetail(){

            }

        }

    }
</script>

<style scoped>

</style>
