<template>
    <div class="card-container">
        <common-top-form :model="formModel" :show="false">
            <el-form-item label="机构名称">
                <el-select v-model="formModel.organ">
                    <el-option
                        v-for="item in organs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="应用名称">
                <el-select v-model="formModel.apply">
                    <el-option
                        v-for="item in applys"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </common-top-form>
        <common-table :data="tableData">
            <el-table-column prop="tatName" label="机构名称"></el-table-column>
            <el-table-column prop="appName" label="应用名称"></el-table-column>
            <el-table-column prop="type" label="账户类型"></el-table-column>
            <el-table-column prop="money" label="变动金额"></el-table-column>
            <el-table-column prop="time" label="操作时间"></el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'

    export default {
        name: "InventedDetail",
        components: {
            CommonTopForm, CommonTable
        },
        data() {
            return {
                formModel: {
                    organ: '',
                    apply: '',
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
                    time: '2019-04-05 12:13:14',
                    type: '1000000',
                    money: '1000000',
                }],
            }
        },
        methods: {
            exportInfo() {

            },
        }
    }
</script>

<style scoped>

</style>
