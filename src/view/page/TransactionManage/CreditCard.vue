<template>
    <div class="card-container">
        <common-top-form :model="formModel" @openAddDialog="exportInfo()" :show="false">
            <el-form-item label="信用卡ID">
                <el-input v-model="formModel.id"></el-input>
            </el-form-item>
            <el-form-item label="信用卡号">
                <el-input v-model="formModel.cardNum"></el-input>
            </el-form-item>
            <el-form-item label="所属用户ID">
                <el-input v-model="formModel.userId"></el-input>
            </el-form-item>
            <el-form-item label="注册手机号">
                <el-input v-model="formModel.phone"></el-input>
            </el-form-item>
            <el-form-item label="持卡人姓名">
                <el-input v-model="formModel.name"></el-input>
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
            <el-form-item label="荣宝绑卡ID">
                <el-input v-model="formModel.bankId"></el-input>
            </el-form-item>
            <el-form-item label="注册日期">
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
            <el-table-column prop="id" label="信用卡ID" width="160"></el-table-column>
            <el-table-column prop="cardNum" label="信用卡号" width="180"></el-table-column>
            <el-table-column prop="bank" label="所属银行" width="160"></el-table-column>
            <el-table-column prop="userId" label="所属商户ID" width="160"></el-table-column>
            <el-table-column prop="phone" label="商户注册手机号" width="160"></el-table-column>
            <el-table-column prop="name" label="持卡人姓名" width="160"></el-table-column>
            <el-table-column prop="apply" label="所属机构应用" width="160"></el-table-column>
            <el-table-column prop="time" label="注册日期"  width="180"></el-table-column>
            <el-table-column prop="bankId" label="荣宝绑卡ID" width="160"></el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'

    export default {
        name: "CreditCard",
        components: {
            CommonTopForm, CommonTable
        },
        data() {
            return {
                organs: [{
                    value: '',
                    label: ''
                }],
                formModel: {
                    cardNum:'',
                    userId:'',
                    phone:'',
                    name:'',
                    organ:'',
                    id:'',
                    bankId:'',
                    createTime: ''
                },
                tableData: [{
                    id:'123456798',
                    cardNum:'6228480598270894275',
                    bank:'中国农业银行',
                    userId:'123456798',
                    phone:'13111111111',
                    name:'撒福娃俄方',
                    apply:'发撒法为发',
                    time:'209-05-21 13:18:00',
                    bankId:'13254679879'
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
