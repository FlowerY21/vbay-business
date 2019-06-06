<template>
    <div class="fundsDetail">
        <common-top-form :model="formModel" @openAddDialog="addInfo()" :submitService="submitService"
                         :submitData="submitData" @success="onSuccess" :show="false">
            <el-form-item label="查询">
                <el-input v-model="formModel.searchKey" placeholder="请输入收支类型/来源/金额"></el-input>
            </el-form-item>
        </common-top-form>
        <common-table :data="tableData">
            <el-table-column prop="time" label="时间"></el-table-column>
            <el-table-column prop="type" label="收支类型"></el-table-column>
            <el-table-column prop="source" label="来源"></el-table-column>
            <el-table-column prop="account" label="账户收支"></el-table-column>
            <el-table-column prop="change" label="变动金额"></el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'

    export default {
        name: "BalanceDetail",
        data() {
            return {
                formModel: {
                    searchKey: '',

                },
                submitService: '',
                tableData: [{
                    time: '2019-02-16 15:20:30',
                    type: 'D0',
                    source: '',
                    account: '32.31',
                    change: '26.31',
                }],
            }
        },
        components: {
            CommonTopForm, CommonTable
        },
        computed: {
            submitData() {
            },
        },
        methods: {
            addInfo() {
            },
            onSuccess() {
            },

        }
    }
</script>

<style scoped>

</style>
