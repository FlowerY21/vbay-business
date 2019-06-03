<template>
    <div class="card-container">
        <common-top-form :model="formModel"  :show="false">
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
            <el-table-column prop="organ" label="机构名称" width="160"></el-table-column>
            <el-table-column prop="apply" label="应用名称" width="160"></el-table-column>
            <el-table-column prop="total" label="总收入账户"></el-table-column>
            <el-table-column prop="account" label="可用账户"></el-table-column>
            <el-table-column prop="repayment" label="还款总收入" ></el-table-column>
            <el-table-column prop="quick" label="快捷总收入"></el-table-column>
            <el-table-column prop="virtual" label="虚拟账户"></el-table-column>
            <el-table-column prop="pay" label="支出账户"></el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="text" @click="updateInfo(scope.row)">调账</el-button>
                </template>
            </el-table-column>
        </common-table>
        <form-dialog  ref="formDialog" :formDialogTitle="formDialogTitle" :model="dialogModel" class="note">
            <el-form-item label="选择机构">
                <el-select v-model="dialogModel.organ">
                    <el-option
                        v-for="item in dialogOrgans"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="调账类型">
                <el-select v-model="dialogModel.type">
                    <el-option
                        v-for="item in dialogTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="调账金额">
                <el-input v-model="dialogModel.money" placeholder="请输入调账金额"></el-input>
                <span>元</span>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="dialogModel.content" type="textarea" resize="none" rows="3"></el-input>
            </el-form-item>

        </form-dialog>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'
    import FormDialog from '../../dialog/FormDialog'
    export default {
        name: "AccountManage",
        components:{
            CommonTopForm,CommonTable,FormDialog
        },
        data() {
            return {
                formModel:{
                    organ:'',
                    apply:'',
                },
                organs:[{
                    value:'',
                    label:''
                }],
                applys:[{
                    value:'',
                    label:''
                }],
                dialogOrgans:[{
                    value:'',
                    label:''
                }],
                dialogTypes:[{
                    value:'',
                    label:''
                }],
                tableData:[{
                    organ:'圆圆数据',
                    apply:'一码智能版',
                    total:'23456',
                    account:'23431',
                    repayment:'12432',
                    quick:'23123',
                    virtual:'111234',
                    pay:'3000',
                }],
                formDialogTitle:'',
                dialogModel:{
                    organ:'',
                    type:'',
                    money:'',
                    content:''
                }
            }
        },
        methods:{
            updateInfo(id){
                this.formDialogTitle = "调账"
                this.$refs.formDialog.open();
            }
        }
    }
</script>

<style scoped>

</style>
