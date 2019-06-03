<template>
    <div class="card-container">
        <common-top-form :model="formModel" @openAddDialog="addInfo()" :submitService="submitService"
                         :submitData="submitData" @success="onSuccess">
            <el-form-item label="机构简称">
                <el-select v-model="formModel.tatSimpleId">
                    <el-option
                        v-for="item in topTatSimpleNames"
                        :key="item.id"
                        :label="item.simpleName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </common-top-form>
        <common-table :data="tableData" :isShow="false">
            <el-table-column prop="tatSimpleId" label="机构简称" width="160"></el-table-column>
            <el-table-column prop="chnId" label="通道名称"></el-table-column>
            <el-table-column prop="feeType" label="计费类型">
                <template slot-scope="scope">
                    <p>{{scope.row.feeType == 1 ? '费率' : '笔'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="feeAmt" label="计费标准">
                <template slot-scope="scope">
                    <p>{{scope.row.feeAmt/100}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="modifier" label="修改人"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <p>{{scope.row.status == 0 ? '禁用' : '启用'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间" width="160"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button type="text" @click="updateInfo(scope.row.id)">修改</el-button>
                    <!--<el-button type="text" class="button-color">删除</el-button>-->
                    <el-button type="text" @click="Disabled(scope.row.id,scope.row.status)" class="button-color">
                        {{scope.row.status == 1 ? '禁用' : '启用'}}
                    </el-button>
                </template>
            </el-table-column>
        </common-table>
        <form-dialog ref="formDialog" :formDialogTitle="formDialogTitle" :model="dialogModel"
                     :dialogService="dialogService" :submitData="dialogData" :rules="dialogRules"
                     @success="dialogSuccess" @close="dialogClose" @opend="dialogOpen" class="note">
            <el-form-item label="机构简称" prop="tatSimpleId">
                <!--<el-input v-model="dialogModel.tatSimpleId" placeholder="请输入机构名称"></el-input>-->
                <el-select v-model="dialogModel.tatSimpleId">
                    <el-option
                        v-for="item in tatSimpleNames"
                        :key="item.id"
                        :label="item.simpleName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="通道名称" prop="chnId">
                <!--<el-input v-model="dialogModel.chnId" placeholder="请输入通道名称"></el-input>-->
                <el-select v-model="dialogModel.chnId">
                    <el-option
                        v-for="item in chnNameList"
                        :key="item.id"
                        :label="item.chnName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="计费方式" prop="feeType" v-if="noteId">
                <el-select v-model="dialogModel.feeType" :disabled="true">
                    <el-option
                        v-for="item in feeTypes"
                        :key="item.dictKey"
                        :label="item.dictValue"
                        :value="item.dictKey">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="计费标准" prop="feeAmt">
                <el-input-number v-model="dialogModel.feeAmt" controls-position="right" :precision="2" :step="0.1" @change="handleChange" :min="0" style="width: 91%"></el-input-number>
                <!--<el-input v-model="dialogModel.feeAmt" placeholder="请输入计费标准"></el-input>-->
                <span>{{dialogModel.feeType == 1 ? '%' : '元'}}</span>
            </el-form-item>
            <!--<el-form-item label="状态" prop="status">-->
            <!--<el-select v-model="dialogModel.status">-->
            <!--<el-option-->
            <!--v-for="item in status"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="描述" prop="remark">
                <el-input v-model="dialogModel.remark" type="textarea" resize="none"></el-input>
            </el-form-item>
        </form-dialog>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'
    import ElInput from "element-ui/packages/input/src/input";
    import FormDialog from '../../dialog/FormDialog'

    import OrganService from 'service/OrganService'
    import ChannelService from 'service/ChannelService'
    import OrganNoteService from 'service/OrganNoteService'
    import privateKey from 'service/constant/privateKey'
    import {encrypt, urlEncode, objKeySort} from "common/js/common-utils";
    import {loadMixin, dialogMixin, validatorsMixin} from "mixin";
    import {mapState} from 'vuex'

    export default {
        name: "OrganNote",
        data() {
            return {
                all: [{
                    id: '',
                    simpleName: '全部'
                }],
                tatSimpleNames: [],
                topTatSimpleNames: [],
                chnNameList: [],
                formModel: {
                    tatSimpleId: '',
                },
                tableData: [],
                submitService: OrganNoteService.list,
                formDialogTitle: '',
                dialogModel: {
                    tatSimpleId: '',
                    chnId: '',
                    feeType: '',
                    feeAmt: '',
                    status: '',
                    desc: '',
                },
                feeTypes: [],
                status: [{
                    value: '0',
                    label: '禁用',
                }, {
                    value: '1',
                    label: '启用',
                }],
                noteId: '',
                dialogRules: {
                    tatSimpleId: [{
                        required: true,
                        message: '请选择机构简称'
                    }],
                    feeAmt: [{
                        required: true,
                        message: '请输入收费标准'
                    }],
                    chnId:[{
                        required:true,
                        message: '请选择通道名称'
                    }],
                },
            }
        },
        mixins: [loadMixin, dialogMixin, validatorsMixin],
        components: {
            ElInput,
            CommonTopForm,
            CommonTable,
            FormDialog
        },
        computed: {
            dialogService() {
                if (this.noteId) {
                    return OrganNoteService.update;
                } else {
                    return OrganNoteService.add;
                }
            },
            dialogData() {
                const params = {
                    serverType: this.serverType,
                    tatId: this.tatId,
                    tatSimpleId: this.dialogModel.tatSimpleId,
                    chnId: this.dialogModel.chnId,
                    feeAmt: this.dialogModel.feeAmt,
                    remark: this.dialogModel.remark,
                    userId: this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                if (this.noteId) {
                    params.id = this.noteId;
                }
                if (this.dialogModel.remark == '' ||this.dialogModel.remark == undefined) {
                    delete params.remark;
                }
                params.sign = encrypt(urlEncode(objKeySort(params)) + '&priKey=' + privateKey.priKey);
                return params;
            },
            submitData() {
                this.params = {
                    serverType: this.serverType,
                    tatId: this.tatId,
                    tatSimpleId: this.formModel.tatSimpleId,
                    userId: this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                this.params.sign = encrypt(urlEncode(objKeySort(this.params)) + '&priKey=' + privateKey.priKey);
                return this.params;
            },
            commonParams(){
                const params = {
                    serverType: this.serverType,
                    tatId: this.tatId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                params.sign = encrypt(urlEncode(objKeySort(params)) + '&priKey=' + privateKey.priKey);
                return params;
            },
            ...mapState(['serverType', 'tatId', 'userId'])
        },
        mounted() {
            this.getSimpleNames();
            this.getList();

            this.getTypeNames('feeType', (res) => {
                this.feeTypes = res;
            });
        },
        methods: {
            handleChange(e){

            },
            getSimpleNames() {
                this.doLoad(OrganService.simpleNames,this.commonParams, res => {
                    this.doCheck(res, res => {
                        this.tatSimpleNames = JSON.parse(res.contents);
                        this.topTatSimpleNames = [...this.all, ...JSON.parse(res.contents)];
                    });
                }, '信息获取失败')
            },
            getchnNameList(){
                this.doLoad(ChannelService.names,this.commonParams, res => {
                    this.doCheck(res, res => {
                        this.chnNameList = JSON.parse(res.contents);
                    });
                }, '信息获取失败')
            },
            addInfo() {
                this.formDialogTitle = '添加机构短信';
                this.$refs.formDialog.open();
            },
            updateInfo(id) {
                this.noteId = id;
                this.getDetail();
                this.formDialogTitle = '修改机构短信';
                this.$refs.formDialog.open();
            },
            getDetail() {
                const params = {
                    serverType: this.serverType,
                    tatId: this.tatId,
                    id: this.noteId,
                    userId: this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                params.sign = encrypt(urlEncode(objKeySort(params)) + '&priKey=' + privateKey.priKey);

                this.doLoad(OrganNoteService.detail, params, res => {
                    this.doCheck(res, res => {
                        const result = JSON.parse(res.contents);
                        this.dialogModel = result;
                        this.dialogModel.feeAmt = this.dialogModel.feeAmt / 100;
                        this.dialogModel.feeType = this.dialogModel.feeType.toString();
                        this.dialogModel.status = this.dialogModel.status.toString();
                    });
                }, '信息获取失败')

            },
            getList() {
                this.doLoad(OrganNoteService.list, this.submitData, res => {
                    this.doCheck(res, res => {
                        const result = JSON.parse(res.contents);
                        this.tableData = result.rows;
                    });
                }, '信息获取失败')
            },
            onSuccess(data) {
                this.doCheck(data, res => {
                    const result = JSON.parse(res.contents);
                    this.tableData = result.rows;
                })
            },
            doDisabled(id) {
                const disabledParams = {
                    serverType: this.serverType,
                    tatId: this.tatId,
                    id: id,
                    userId: this.userId,
                    status: this.status,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                disabledParams.sign = encrypt(urlEncode(objKeySort(disabledParams)) + '&priKey=' + privateKey.priKey);
                this.doLoad(OrganNoteService.dpstatus, disabledParams, res => {
                    this.doCheck(res, res => {
                        const result = JSON.parse(res.contents);
                        this.showSuccess(result.optMsg);
                        this.getList();
                    });
                }, '操作失败')
            },
            Disabled(id, type) {
                if (type == 0) {
                    this.status = 1;
                    this.showMsg = '确定启用此机构短信？'
                } else if (type == 1) {
                    this.status = 0;
                    this.showMsg = '确定禁用此机构短信？'
                }
                this.showConfirm(this.showMsg).then(() => {
                    this.doDisabled(id)
                }).catch(() => {
                });
            },
            dialogSuccess() {
                this.$refs.formDialog.closeDialog();
                this.getList();
            },
            dialogClose() {
                this.dialogModel = {};
            },
            dialogOpen() {
                this.getchnNameList();
                if (this.noteId) {
                    this.getDetail();
                }
            },
        }
    }
</script>

<style scoped>

</style>
