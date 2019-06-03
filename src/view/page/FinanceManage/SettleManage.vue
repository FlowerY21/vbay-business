<template>
    <div class="card-container">
        <common-top-form :model="formModel"  @openAddDialog="add">
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
                </el-form-item><el-form-item label="应用名称">
                    <el-select v-model="formModel.apply">
                        <el-option
                            v-for="item in applys"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="结算类别">
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
            <el-form-item label="结算日期">
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
            <el-table-column prop="type" label="结算类别" width="160"></el-table-column>
            <el-table-column prop="modifier" label="操作人"></el-table-column>
            <el-table-column prop="updateTime" label="操作时间"></el-table-column>
            <el-table-column prop="money" label="结算金额" width="160"></el-table-column>
            <el-table-column prop="content" label="备注"></el-table-column>
        </common-table>
        <form-dialog  ref="formDialog" :formDialogTitle="formDialogTitle" :model="dialogModel"
                       :submitData="dialogData" :rules="dialogRules"
                      class="over" @success="dialogSuccess" @close="dialogClose" labelWidth="100px">
            <el-form-item label="选择机构" prop="organ">
                <el-select v-model="dialogModel.organ">
                    <el-option
                        v-for="item in organList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择应用" prop="apply">
                <el-select v-model="dialogModel.apply">
                    <el-option
                        v-for="item in applyList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="结算种类" prop="type">
                <el-select v-model="dialogModel.type">
                    <el-option
                        v-for="item in typeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="起始日期" prop="time">
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    :start-placeholder="dialogModel.validStart"
                    :end-placeholder="dialogModel.validEnd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结算金额">
                <el-button type="text" class="inner-button">计算结算金额</el-button>
                <el-input v-model="dialogModel.settleMoney" disabled="true" placeholder="0.00"></el-input>
            </el-form-item>
        </form-dialog>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'
    import FormDialog from '../../dialog/FormDialog'

    export default {
        name: "SettleManage",
        components: {
            CommonTopForm, CommonTable,FormDialog
        },
        data() {
            return {
                formModel: {
                    organ: '',
                    apply:'',
                    type:'',
                    time: ''
                },
                organs: [{
                    value: '',
                    label: ''
                }],
                organList: [{
                    value: '',
                    label: ''
                }],
                types: [{
                    value: '',
                    label: ''
                }],
                typeList: [{
                    value: '',
                    label: ''
                }],
                applys: [{
                    value: '',
                    label: ''
                }],
                applyList: [{
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
                    organ:'',
                    apply:'',
                    type:'',
                    validStart:'开始日期',
                    validEnd:'结束日期',
                    settleMoney:'',
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
                this.formDialogTitle = '添加结算';
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
</style>
