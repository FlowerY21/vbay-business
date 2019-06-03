<template>
    <div class="card-container">
        <common-el-form :model="formModel" :rules="formRules" :submitData="submitData" @success="onSuccess"
                        @cancel="onCancel"
                        submit-btn-text="提交" failTitle="提交失败" loadingText="提交中..."
                        :submitService="submitService" labelWidth="100px">
            <el-form-item label="简称" prop="shortName">
                <el-input v-model="formModel.shortName" placeholder="请输入简称" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="通道名称" prop="ChnName">
                <el-input v-model="formModel.ChnName" placeholder="请输入通道名称" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="connPerson">
                <el-input v-model="formModel.connPerson" placeholder="请输入联系人" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="connTel">
                <el-input v-model="formModel.connTel" placeholder="请输入联系电话" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="计费标准" prop="feeAmt">
                <!--<el-input v-model="formModel.feeAmt" type="number" placeholder="请输入联系人" style="width: 300px"></el-input>-->

                <el-input-number v-model="formModel.feeAmt" controls-position="right" @change="handleChange" style="width: 300px"></el-input-number>
                <span>元</span>
            </el-form-item>
            <el-form-item label="用户名" prop="reqUsername">
                <el-input v-model="formModel.reqUsername" placeholder="请输入用户名" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="reqPassword">
                <el-input v-model="formModel.reqPassword" type="password" placeholder="请输入密码" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="请求地址" prop="reqAddr">
                <el-input v-model="formModel.reqAddr" type="textarea" resize="none" placeholder="请输入请求地址" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="Desc">
                <el-input v-model="formModel.Desc" type="textarea" resize="none" style="width: 300px"></el-input>
            </el-form-item>
        </common-el-form>
    </div>
</template>

<script>
    import CommonElForm from 'components/common/CommonElForm'
    import ElFormItem from "element-ui/packages/form/src/form-item";
    import ChannelNoteService from 'service/ChannelNoteService'
    import ChannelAuthService from 'service/ChannelAuthService'
    import privateKey from 'service/constant/privateKey';
    import {encrypt, urlEncode, objKeySort} from "common/js/common-utils";
    import {loadMixin,dialogMixin,validatorsMixin} from "mixin";
    import {mapState} from 'vuex'

    export default {
        name: "AddChannelCommon",
        data() {
            return {
                formRules:{
                    shortName:[{
                        required:true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请输入简称'))
                            } else if (this.checkshortNameOnly) {
                                callback(new Error('简称不能重复'))
                            } else {
                                callback()
                            }
                        },
                    }],
                    ChnName:[{
                        required:true,
                        message:'请输入通道名称'
                    }],
                    connPerson:[{
                        required:true,
                        message:'请输入联系人'
                    }],
                    connTel:[{
                        required:true,
                        validator: this.validPhone,
                        trigger: ['blur', 'change']
                    }],
                    feeAmt:[{
                        required:true,
                        message:'请输入收费标准'
                    }]
                },
                formModel:{},
                noteId:'',
                type:'',
                shortNames:[],
                getShortName:'',
                apiUrl:'',
            }
        },
        mixins:[loadMixin,dialogMixin,validatorsMixin],
        components: {
            ElFormItem,CommonElForm
        },
        computed: {
            checkshortNameOnly() {
                for (let i = 0; i < this.shortNames.length; i++) {
                    if (this.formModel.shortName == this.shortNames[i].shortName) {
                        if (this.getShortName == this.shortNames[i].shortName) {
                            return false;
                        }
                        return true;
                    } else {
                        if ( i== this.shortNames.length-1 ) {
                            return false;
                        }
                    }
                }
            },
            submitData() {
                this.params = {
                    serverType:this.serverType,
                    tatId: this.tatId,
                    shortName: this.formModel.shortName,

                    connPerson: this.formModel.connPerson,
                    connTel: this.formModel.connTel,
                    feeAmt: this.formModel.feeAmt,

                    reqAddr: this.formModel.reqAddr,
                    reqUsername: this.formModel.reqUsername,
                    reqPassword: this.formModel.reqPassword,
                    userId:this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                if (this.type == 1) {
                    this.params.smsChnName = this.formModel.ChnName;
                    this.params.smsDesc = this.formModel.Desc;
                }else if(this.type == 2) {
                    this.params.authChnName = this.formModel.ChnName;
                    this.params.authDesc = this.formModel.Desc;
                }




                if (this.noteId) {
                    this.params.id = this.noteId;
                }
                this.params.sign = encrypt(urlEncode(objKeySort(this.params)) + '&priKey=' + privateKey.priKey);
                return this.params;
            },
            submitService() {
                if (this.type == '1') {
                    if (this.noteId) {
                        return ChannelNoteService.update
                    }else{
                        return ChannelNoteService.add
                    }
                }else if(this.type == '2'){
                    if (this.noteId) {
                        return ChannelAuthService.update
                    }else{
                        return ChannelAuthService.add
                    }
                }

            },
            ...mapState(['serverType','tatId','userId'])
        },
        mounted(){
            this.noteId = this.$route.params.id;
            this.type = this.$route.params.type;
            if (this.noteId) {
                this.getDetail();
            }
            this.getShortNames();
        },
        methods: {
            getDetail(){
                const params = {
                    serverType:this.serverType,
                    tatId:this.tatId,
                    id:this.noteId,
                    userId:this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                params.sign = encrypt(urlEncode(objKeySort(params)) + '&priKey=' + privateKey.priKey);

                if (this.type == 1) {
                    this.apiUrl = ChannelNoteService.detail
                }else if(this.type == 2){
                    this.apiUrl = ChannelAuthService.detail
                }

                this.doLoad(this.apiUrl,params,res => {
                    this.doCheck(res,res =>{
                        const result = JSON.parse(res.contents);
                        this.formModel = result;
                        console.log('detail',result)
                        this.formModel.feeAmt = this.formModel.feeAmt/100;
                        this.getShortName = this.formModel.shortName;

                        if (this.type == 1) {
                            this.$set( this.formModel,'ChnName',this.formModel.smsChnName);
                            this.$set( this.formModel,'Desc',this.formModel.smsDesc);
                        }else if(this.type == 2){
                            this.$set( this.formModel,'ChnName',this.formModel.authChnName);
                            this.$set( this.formModel,'Desc',this.formModel.authDesc);
                        }
                    });
                },'信息获取失败')
            },
            onSuccess(data) {
                this.doCheck(data,res => {
                    this.$router.back();
                    this.showSuccess(JSON.parse(res.contents).optMsg);
                })
            },
            onCancel(){
                this.$router.back();
            },
            getShortNames(){
                const params = {
                    serverType:this.serverType,
                    tatId:this.tatId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                params.sign = encrypt(urlEncode(objKeySort(params)) + '&priKey=' + privateKey.priKey);

                if (this.type == 1) {
                    this.apiUrl = ChannelNoteService.shortNames
                }else if(this.type == 2){
                    this.apiUrl = ChannelAuthService.shortNames
                }

                this.doLoad(this.apiUrl,params,res => {
                    this.doCheck(res,res =>{
                        const result = JSON.parse(res.contents);
                        this.shortNames = result;
                    });
                },'信息获取失败')
            },
            handleChange(value) {
                console.log(value);
            }
        }
    }
</script>

<style scoped>

</style>
