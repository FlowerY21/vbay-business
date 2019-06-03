<template>
    <div class="card-container">
        <common-top-form :model="formModel" @openAddDialog="addInfo" :submitService="submitService" :submitData="submitData" @success="onSuccess">
            <el-form-item label="名称" prop="typeName">
                <el-input v-model="formModel.typeName" placeholder="请输入机构名称"></el-input>
            </el-form-item>
        </common-top-form>
        <common-table :data="tableData" ref="commonTable" @handleChange="getList">
            <el-table-column prop="typeName" label="名称"></el-table-column>
            <!--<el-table-column prop="detail" label="详情">-->
                <!--<template slot-scope="scope">-->
                <!--{{scope.row.dictKey}}:{{scope.row.dictValue}}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="dictKey" label="字典key">
            </el-table-column>
            <el-table-column prop="dictValue" label="字典value">
            </el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="addInfo(scope.row.id)">修改</el-button>
                    <el-button  type="text" @click="deleInfo(scope.row.id)" class="button-color">删除</el-button>
                </template>
            </el-table-column>
        </common-table>
        <form-dialog  ref="formDialog" :formDialogTitle="formDialogTitle" :model="dialogModel"
                      :dialogService="dialogService" :submitData="dialogData" :rules="dialogRules"
                      class="over" @success="dialogSuccess" @close="dialogClose" @opend="dialogOpen" labelWidth="140px">
            <el-form-item label="类型名称" prop="typeName">
                <el-input v-model="dialogModel.typeName" placeholder="请输入类型名称"></el-input>
            </el-form-item>
            <el-form-item label="字典Key" prop="dictKey">
                <el-input v-model="dialogModel.dictKey" placeholder="请输入字典Key"></el-input>
            </el-form-item>
            <el-form-item label="字典Value" prop="dictValue">
                <el-input v-model="dialogModel.dictValue" placeholder="请输入字典Value"></el-input>
            </el-form-item>
            <el-form-item label="类型说明" prop="remark">
                <el-input v-model="dialogModel.remark" placeholder="请输入类型说明"></el-input>
            </el-form-item>
        </form-dialog>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'
    import FormDialog from '../../dialog/FormDialog'
    import SystemDicService from 'service/SystemDicService'
    import privateKey from 'service/constant/privateKey'
    import {encrypt, urlEncode, objKeySort} from "common/js/common-utils";
    import {loadMixin,dialogMixin,validatorsMixin} from "mixin";
    import {mapState} from 'vuex'
    export default {
        name: "DictionaryManage",
        components:{
            CommonTopForm,CommonTable,FormDialog
        },
        data(){
            return{
                formModel:{
                    typeName:'',
                },
                params:{},
                page:{},
                tableData:[],
                submitService:SystemDicService.list,
                formDialogTitle:'',
                dialogModel:{},
                dialogRules:{
                    typeName:[{
                        required:true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请输入类型名称'))
                            } else if (this.checkChnNameOnly) {
                                callback(new Error('类型名称或字典Key不能重复'))
                            } else {
                                callback()
                            }
                        },
                    }],
                    dictKey:[{
                        required:true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请输入字典Key'))
                            } else if (this.checkChnNameOnly) {
                                callback(new Error('类型名称或字典Key不能重复'))
                            } else {
                                callback()
                            }
                        },
                    }],
                    dictValue: [{
                        required: true,
                        message:'请输入字典Value'
                    }],
                    remark: [{
                        required: true,
                        message:'请输入类型说明'
                    }],
                },
                dictId:'',
                getTypeName:'',
                getDictKey:'',
            }
        },
        mixins:[loadMixin,dialogMixin,validatorsMixin],
        mounted(){
            this.page = this.$refs.commonTable.page;
            this.getList();
        },
        computed:{
            checkChnNameOnly(){
                for(let i=0; i<this.tableData.length;i++){
                    if (this.dialogData.typeName == this.tableData[i].typeName && this.dialogData.dictKey == this.tableData[i].dictKey) {
                        if (this.getTypeName == this.tableData[i].typeName && this.getDictKey == this.tableData[i].dictKey) {
                            return false;
                        }
                        return true;
                    }else{
                        if(i==this.tableData.length-1){
                            return false;
                        }
                    }
                }
            },
            dialogService() {
                if (this.dictId) {
                    return SystemDicService.update;
                } else {
                    return SystemDicService.add;
                }
            },
            dialogData() {
                const params = {
                    serverType:this.serverType,
                    tatId: this.tatId,
                    typeName: this.dialogModel.typeName,
                    dictKey: this.dialogModel.dictKey,
                    dictValue: this.dialogModel.dictValue,
                    remark: this.dialogModel.remark,
                    userId:this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                if (this.dictId) {
                    params.id = this.dictId;
                }
                params.sign = encrypt(urlEncode(objKeySort(params)) + '&priKey=' + privateKey.priKey);
                return params;
            },
            submitData(){
                this.params = {
                    serverType:this.serverType,
                    tatId: this.tatId,
                    typeName: this.formModel.typeName,
                    current: this.page.currentPage,
                    size: this.page.pageSize,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                this.params.sign = encrypt(urlEncode(objKeySort(this.params)) + '&priKey=' + privateKey.priKey);
                return this.params;
            },
            ...mapState(['serverType','tatId','userId'])
        },
        methods:{
            getList() {
                this.doLoad(SystemDicService.list,this.submitData,res => {
                    this.doCheck(res,res =>{
                        const result = JSON.parse(res.contents);
                        this.tableData = result.rows;
                        // console.log(result.rows)
                        this.page.currentPage = result.current;
                        this.page.total = result.total;
                        this.page.pageSize = result.size;
                    });
                },'信息获取失败')
            },
            getDetail() {
                const detailParams = {
                    serverType:this.serverType,
                    tatId: this.tatId,
                    id:this.dictId,
                    userId: this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                detailParams.sign = encrypt(urlEncode(objKeySort(detailParams)) + '&priKey=' + privateKey.priKey);
                this.doLoad(SystemDicService.detail,detailParams,res => {
                    this.doCheck(res,res =>{
                        const result = JSON.parse(res.contents);
                        this.dialogModel = result;
                        this.getTypeName = this.dialogModel.typeName;
                        this.getDictKey = this.dialogModel.dictKey;
                    });
                },'信息获取失败')
            },
            addInfo(id) {
                this.dictId = id;
                if (this.dictId) {
                    this.formDialogTitle = '修改字典';
                    this.getDetail();
                }else{
                    this.formDialogTitle = '添加字典';
                }
                this.$refs.formDialog.open();
            },
            onSuccess(data) {
                this.doCheck(data,res => {
                    const result = JSON.parse(res.contents);
                    this.tableData = result.rows;
                    this.page.currentPage = result.current;
                    this.page.total = result.total;
                    this.page.pageSize = result.size;
                })
            },
            dialogSuccess() {
                this.$refs.formDialog.closeDialog();
                this.dictId = '';
                this.getList();
            },
            dialogOpen() {

            },
            dialogClose() {
                this.dialogModel = {};
            },
            doDeleInfo(id){
                const disabledParams = {
                    serverType:this.serverType,
                    tatId: this.tatId,
                    id: id,
                    status: 0,
                    userId: this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                disabledParams.sign = encrypt(urlEncode(objKeySort(disabledParams)) + '&priKey=' + privateKey.priKey);
                this.doLoad(SystemDicService.dpStatus,disabledParams,res => {
                    this.doCheck(res,res => {
                        const result = JSON.parse(res.contents);
                        this.showSuccess(result.optMsg);
                        this.getList();
                    });
                },'操作失败')
            },
            deleInfo(id){
                this.showConfirm('确定删除此字典？').then(()=>{
                    this.doDeleInfo(id)
                }).catch(()=>{});
            },
        }
    }
</script>

<style scoped>

</style>
