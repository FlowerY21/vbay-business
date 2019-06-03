<template>
    <div class="card-container">
        <common-top-form :model="formModel" :show="false">
            <el-row>
                <el-form-item label="调整机构名称">
                    <el-select v-model="formModel.organ">
                        <el-option
                            v-for="item in organs"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="调账类型">
                    <el-select v-model="formModel.type">
                        <el-option
                            v-for="item in types"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-form-item label="调账日期">
                <el-date-picker
                    v-model="formModel.time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
        </common-top-form>
        <common-table :data="tableData">
            <el-table-column prop="organ" label="调账机构名称" width="160"></el-table-column>
            <el-table-column prop="type" label="调账类型"></el-table-column>
            <el-table-column prop="user" label="操作人"></el-table-column>
            <el-table-column prop="time" label="调账日期" width="160"></el-table-column>
            <el-table-column prop="money" label="调账金额"></el-table-column>
            <el-table-column prop="content" label="备注"></el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'

    export default {
        name: "AccountAdjustmentDetail",
        components: {
            CommonTopForm, CommonTable
        },
        data() {
            return {
                formModel: {
                    organ: '',
                    type: '',
                    time: ''
                },
                organs: [{
                    value: '',
                    label: ''
                }],
                types: [{
                    value: '',
                    label: ''
                }],
                tableData: [{
                    organ: '一码智能版',
                    type: '调出',
                    user: '张三丰',
                    time: '2019-04-05 12:13:14',
                    money: '1000000',
                    content: '赏你的',
                }],
            }
        },
    }
</script>

<style scoped>

</style>
