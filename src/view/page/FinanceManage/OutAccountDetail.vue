<template>
    <div class="card-container">
        <common-top-form :model="formModel" :show="false">
            <el-row>
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
            </el-row>
            <el-form-item label="认证日期">
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
            <el-table-column prop="organ" label="机构名称" width="160"></el-table-column>
            <el-table-column prop="apply" label="应用名称"></el-table-column>
            <el-table-column prop="type" label="出账类型"></el-table-column>
            <el-table-column prop="time" label="出账时间" width="160"></el-table-column>
            <el-table-column prop="spend" label="花费金额"></el-table-column>
            <el-table-column prop="money" label="剩余金额"></el-table-column>
            <el-table-column prop="content" label="备注"></el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'

    export default {
        name: "OutAccountDetail",
        components: {
            CommonTopForm, CommonTable
        },
        data() {
            return {
                formModel: {
                    organ: '',
                    time: ''
                },
                organs: [{
                    value: '',
                    label: ''
                }],
                tableData: [{
                    organ: '一码智能版',
                    apply: '一码智能版',
                    type: '实名认证',
                    time: '2019-04-05 12:13:14',
                    spend: '1000000',
                    money: '1000000',
                    content: '赏你的',
                }],
            }
        },
    }
</script>

<style scoped>

</style>
