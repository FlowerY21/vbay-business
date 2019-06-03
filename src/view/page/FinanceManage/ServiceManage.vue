<template>
    <div class="card-container">
        <common-top-form :model="formModel"  @openAddDialog="add" :show="true" buttonName="充值" :cutButton="true">
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
            </el-row>
            <el-form-item label="充值时间">
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
            <el-table-column prop="tatName" label="机构名称" width="160"></el-table-column>
            <el-table-column prop="appName" label="应用名称"></el-table-column>
            <el-table-column prop="type" label="交易类型" width="160"></el-table-column>
            <el-table-column prop="money" label="交易金额" width="160"></el-table-column>
            <el-table-column prop="modifier" label="操作人"></el-table-column>
            <el-table-column prop="updateTime" label="操作时间"></el-table-column>
            <el-table-column prop="content" label="备注"></el-table-column>
        </common-table>
        <form-dialog  ref="formDialog" :formDialogTitle="formDialogTitle" :model="dialogModel"
                       :submitData="dialogData" :rules="dialogRules"
                      class="over" @success="dialogSuccess" @close="dialogClose" labelWidth="100px">

            <el-form-item label="机构名称" prop="tatName">
                <el-input v-model="dialogModel.tatName" placeholder="请输入机构名称"></el-input>
            </el-form-item>
            <el-form-item label="应用名称" prop="appName">
                <el-input v-model="dialogModel.appName" placeholder="请输入应用名称"></el-input>
            </el-form-item>
            <p class="notice"><span>充值类型</span>充值（扣款时显示扣款）</p>
            <el-form-item label="充值金额" prop="money">
                <el-input v-model="dialogModel.money" placeholder="请输入机构名称"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="content">
                <el-input type="textarea" resize="none" rows="4" v-model="dialogModel.content" ></el-input>
            </el-form-item>
        </form-dialog>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'
    import FormDialog from '../../dialog/FormDialog'

    export default {
        name: "ServiceManage",
        components: {
            CommonTopForm, CommonTable,FormDialog
        },
        data() {
            return {
                formModel: {
                    organ: '',
                    apply:'',
                    time: ''
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
                    type: '1000000',
                    modifier: '2834628734627834',
                    updateTime: '2019-04-05 12:13:14',
                    money: '1000000',
                    content: '赏你的',
                }],
                formDialogTitle:'',
                dialogRules:{},
                dialogModel:{
                    tatName:'',
                    appName:'',
                    money:'',
                    content:'',
                },
                time:'',
            }
        },
        computed:{
            dialogData(){
                return;
            }
        },
        methods:{
            add() {
                this.formDialogTitle = '认证充值';
                this.$refs.formDialog.open();
            },
            dialogSuccess() {

            },
            dialogClose() {

            }
        }
    }
</script>

<style scoped>
    .inner-button{
        position: absolute;
        right: 10px;
        z-index: 1;
    }
    .notice{
        font-size: 14px;
        color: #AAAAAA;
        margin-bottom: 10px;
    }
    .notice span{
        width: 70px;
        display: inline-block;
        text-align: right;
        margin-right: 10px;
        color: #606266;
    }
</style>
