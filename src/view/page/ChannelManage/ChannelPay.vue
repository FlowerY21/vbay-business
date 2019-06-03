<template>
    <div class="card-container">
        <common-top-form :model="formModel" @openAddDialog="addInfo()" @success="onSuccess" :submitService="submitService" :submitData="submitData">
            <el-form-item label="通道名称">
                <el-input v-model="formModel.name" placeholder="请输入通道名称"></el-input>
            </el-form-item>
            <el-form-item label="通道状态">
                <el-select v-model="formModel.status">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </common-top-form>
        <common-table :data="tableData" ref="commonTable">
            <el-table-column prop="chnName" label="通道名称" width="160"></el-table-column>
            <el-table-column prop="status" label="通道状态">
                <template slot-scope="scope">
                    <p>{{scope.row.status == 0 ? '禁用' : '启用'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="conPerson" label="联系人"></el-table-column>
            <el-table-column prop="conTel" label="联系方式"width="160"></el-table-column>
            <el-table-column prop="modifier" label="修改人"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间"width="160"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button type="text" @click="updateInfo(scope.row.id)">修改</el-button>
                    <el-button type="text" class="button-color">删除</el-button>
                    <el-button type="text" class="button-color" @click="Disabled(scope.row.id,scope.row.status)">{{scope.row.status == 1 ? '禁用' : '启用'}}</el-button>
                </template>
            </el-table-column>
        </common-table>
        <form-dialog  ref="formDialog" :formDialogTitle="formDialogTitle" :model="dialogModel"
                      :dialogService="dialogService" :submitData="dialogData" :rules="dialogRules"
                      class="over" @success="dialogSuccess" @close="dialogClose" @opend="dialogOpen" labelWidth="100px">
            <el-form-item label="通道名称" prop="chnName">
                <el-input v-model="dialogModel.chnName" placeholder="请输入通道名称"></el-input>
            </el-form-item>
            <el-form-item label="通道描述">
                <el-input type="textarea" rows="3" resize="none" v-model="dialogModel.chnDesc"  placeholder="请输入通道描述"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="conPerson">
                <el-input v-model="dialogModel.conPerson" placeholder="请输入联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="conTel">
                <el-input v-model="dialogModel.conTel" placeholder="请输入联系电话"></el-input>
            </el-form-item>
        </form-dialog>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'
    import FormDialog from '../../dialog/FormDialog'
    import ChannelService from 'service/ChannelService'
    import privateKey from 'service/constant/privateKey'
    import {encrypt, urlEncode, objKeySort} from "common/js/common-utils";
    import {loadMixin,dialogMixin,validatorsMixin} from "mixin";
    import {mapState} from 'vuex'

    export default {
        name: "ChannelPay",
        data(){
            return{
                dialogRules:{
                    chnName:[{
                        required:true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请输入通道名称'))
                            } else if (this.checkChnNameOnly) {
                                callback(new Error('通道名称不能重复'))
                            } else {
                                callback()
                            }
                        },
                    }],
                    conPerson:[{
                        required:true,
                        message:'请输入联系人'
                    }],
                    conTel: [{
                        required: true,
                        validator: this.validPhone,
                        trigger: ['blur', 'change']
                    }],
                },
                options: [{
                    value: '',
                    label: '全部'
                },{
                    value: '0',
                    label: '禁用'
                },{
                    value: '1',
                    label: '启用'
                }],
                stateOptions: [{
                    value: '0',
                    label: '全部'
                }],
                formModel:{
                    name:'',
                    status:'',
                },
                dialogModel:{},
                tableData:[],
                formDialogTitle:'',
                submitService:ChannelService.list,
                page:[],
                chnNameList:[],
                getChnName:'',
                status:'',
                showMsg:'',
                channelId:'',
            }
        },
        mixins:[loadMixin,dialogMixin,validatorsMixin],
        components:{
            CommonTopForm ,
            CommonTable,
            FormDialog
        },
        mounted(){
            this.page = this.$refs.commonTable.page;
            this.getList();
        },
        computed: {
            checkChnNameOnly() {
                for (let i = 0; i < this.chnNameList.length; i++) {
                    if (this.dialogModel.chnName == this.chnNameList[i].chnName) {
                        if (this.getChnName == this.chnNameList[i].chnName) {
                            return false;
                        }
                        return true;
                    } else {
                        if ( i== this.chnNameList.length-1 ) {
                            return false;
                        }
                    }
                }
            },
            submitData() {
                this.params = {
                    serverType:this.serverType,
                    tatId: this.tatId,
                    chnName: this.formModel.name,
                    chnStatus: this.formModel.status,
                    current: this.page.currentPage,
                    size: this.page.pageSize,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                this.params.sign = encrypt(urlEncode(objKeySort(this.params)) + '&priKey=' + privateKey.priKey);
                return this.params;
            },
            dialogData() {
                this.params = {
                    serverType:this.serverType,
                    tatId: this.tatId,
                    chnName: this.dialogModel.chnName,
                    chnDesc: this.dialogModel.chnDesc,
                    conPerson: this.dialogModel.conPerson,
                    conTel: this.dialogModel.conTel,
                    userId: this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                if (this.channelId) {
                    this.params.id = this.channelId;
                }
                this.params.sign = encrypt(urlEncode(objKeySort(this.params)) + '&priKey=' + privateKey.priKey);
                return this.params;
            },
            commonParams() {
                const params = {
                    serverType:this.serverType,
                    tatId: this.tatId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                params.sign = encrypt(urlEncode(objKeySort(params)) + '&priKey=' + privateKey.priKey);
                return params;
            },
            dialogService() {
                if (this.channelId) {
                    return ChannelService.update;
                }else {
                    return  ChannelService.add;
                }
            },
           ...mapState(['serverType','tatId','userId']),
        },
        methods:{
            getList(){
                this.doLoad(ChannelService.list,this.submitData,res => {
                    this.doCheck(res,res =>{
                        const result = JSON.parse(res.contents);
                        this.tableData = result.rows;
                        this.page.currentPage = result.current;
                        this.page.total = result.total;
                        this.page.pageSize = result.size;
                    });
                },'信息获取失败')
            },
            getchnNameList(){
                this.doLoad(ChannelService.names, this.commonParams, res => {
                    this.doCheck(res, res => {
                        this.chnNameList = JSON.parse(res.contents);
                    });
                }, '信息获取失败')
            },
            addInfo(){
                this.formDialogTitle = '添加支付通道';
                this.$refs.formDialog.open();
            },
            updateInfo(id){
                this.channelId = id;
                this.getDetail(id);
                this.formDialogTitle = '修改支付通道';
                this.$refs.formDialog.open();
            },
            getDetail(id){
                const params = {
                    serverType:this.serverType,
                    tatId: this.tatId,
                    id: id,
                    userId: this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                params.sign = encrypt(urlEncode(objKeySort(params)) + '&priKey=' + privateKey.priKey);
                this.doLoad(ChannelService.detail,params,res => {
                    this.doCheck(res,res => {
                        const result = JSON.parse(res.contents);
                        this.dialogModel = result;
                        this.getChnName = this.dialogModel.chnName;
                        this.getList();
                    });
                },'操作失败')
            },
            onSuccess(data){
                const result = JSON.parse(data.contents);
                this.tableData = result.rows;
                this.page.currentPage = result.current;
                this.page.total = result.total;
                this.page.pageSize = result.size;
            },
            dialogSuccess(data) {
                this.showSuccess(JSON.parse(data.contents).optMsg)
                this.$refs.formDialog.closeDialog();
                this.getList();
            },
            dialogOpen() {
                this.getchnNameList
            },
            dialogClose(){
                this.dialogModel = {};
            },
            doDisabled(id){
                const disabledParams = {
                    serverType:this.serverType,
                    tatId: this.tatId,
                    id: id,
                    status: this.status,
                    userId: this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                disabledParams.sign = encrypt(urlEncode(objKeySort(disabledParams)) + '&priKey=' + privateKey.priKey);
                this.doLoad(ChannelService.prohibit,disabledParams,res => {
                    this.doCheck(res,res => {
                        const result = JSON.parse(res.contents);
                        this.showSuccess(result.optMsg);
                        this.getList();
                    });
                },'操作失败')
            },
            Disabled(id,type){
                if (type == 0) {
                    this.status = 1;
                    this.showMsg = '确定启用此通道？'
                }else if (type == 1) {
                    this.status = 0;
                    this.showMsg = '确定禁用此通道？'
                }
                this.showConfirm(this.showMsg).then(()=>{
                    this.doDisabled(id)
                }).catch(()=>{});
            },
        }
    }
</script>

<style scoped>

</style>
