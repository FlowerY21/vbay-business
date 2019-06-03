<template>
    <div class="card-container">
        <common-top-form :model="formModel" @openAddDialog="exportInfo()" :show="false">
            <el-form-item label="认证订单号">
                <el-input v-model="formModel.order"></el-input>
            </el-form-item>
            <el-form-item label="注册手机号">
                <el-input v-model="formModel.phone"></el-input>
            </el-form-item>
            <el-form-item label="所属机构">
                <el-select v-model="formModel.organ">
                    <el-option
                        v-for="item in organs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="认证状态">
                <el-select v-model="formModel.state">
                    <el-option
                        v-for="item in states"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="认证类型">
                <el-select v-model="formModel.mode">
                    <el-option
                        v-for="item in modes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="认证卡号">
                <el-input v-model="formModel.card"></el-input>
            </el-form-item>
            <el-form-item label="认证创建日期">
                <el-date-picker
                    v-model="formModel.createTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
        </common-top-form>
        <common-table :data="tableData">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="order" label="认证订单号" width="160"></el-table-column>
            <el-table-column prop="phone" label="商户注册手机号" width="160"></el-table-column>
            <el-table-column prop="apply" label="所属机构应用" width="160"></el-table-column>
            <el-table-column prop="state" label="认证状态"></el-table-column>
            <el-table-column prop="createTime" label="认证创建时间" width="160"></el-table-column>
            <el-table-column prop="type" label="认证类型" width="160"></el-table-column>
            <el-table-column prop="card" label="卡号"  width="180"></el-table-column>
            <el-table-column prop="bank" label="银行卡类型" width="160"></el-table-column>
            <el-table-column prop="result" label="认证结果信息" width="160"></el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'

    export default {
        name: "Certification",
        components: {
            CommonTopForm, CommonTable
        },
        data() {
            return {
                states: [{
                    value: '',
                    label: ''
                }],
                organs: [{
                    value: '',
                    label: ''
                }],
                modes: [{
                    value: '',
                    label: ''
                }],
                formModel: {
                    order:'',
                    phone:'',
                    organ:'',
                    state:'',
                    mode:'',
                    card:'',
                    createTime: ''
                },
                tableData: [{
                    order: '12346789',
                    phone: '13111111111',
                    apply: '指定用户',
                    state: '成功',
                    createTime: '2019-03-14 10:31:22',
                    type: '银行卡授权',
                    card: '6228480598270894275',
                    bank: '贷记卡',
                    result: '成功',
                }],

            }
        },
        methods: {
            exportInfo() {

            },
            reissueNotice(id) {

            },

        }

    }
</script>

<style scoped>

</style>
