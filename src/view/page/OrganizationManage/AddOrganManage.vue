<template>
    <div class="card-container">
        <common-el-form :model="formModel" :rules="formRules" :submitData="submitData" @success="onSuccess"
                        @cancel="onCancel"
                        submit-btn-text="提交" failTitle="提交失败" loadingText="提交中..."
                        :submitService="submitService" labelWidth="110px">
            <el-form-item label="机构名称" prop="tatName">
                <el-input v-model="formModel.tatName" placeholder="请输入机构名称" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="应用名称" prop="appName">
                <el-input v-model="formModel.appName" placeholder="请输入应用名称" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="机构简称" prop="tatSimpleName">
                <el-input v-model="formModel.tatSimpleName" placeholder="请输入应用名称" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="connPerson">
                <el-input v-model="formModel.connPerson" placeholder="请输入联系人" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="connTel">
                <el-input v-model="formModel.connTel" placeholder="请输入联系电话" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱" prop="email">
                <el-input v-model="formModel.email" placeholder="请输入联系邮箱" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="联系地址" prop="address">
                <el-input type="textarea" v-model="formModel.address" resize="none" placeholder="请输入联系地址"
                          style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="商户私钥" prop="priKey" v-if="organID">
                <el-input type="textarea" v-model="formModel.priKey" resize="none"
                          style="width: 300px" disabled></el-input>
            </el-form-item>
            <el-form-item label="所属区域" prop="regionCode">
                <choose-address @regionCode="getRegionCode" :regionCode="regionCode"></choose-address>
            </el-form-item>
            <el-form-item label="机构缩写" prop="tatAbbr">
                <el-input v-model="formModel.tatAbbr" placeholder="请输入机构缩写" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="合同起始日期" prop="time">
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    :start-placeholder="formModel.validStart"
                    :end-placeholder="formModel.validEnd">
                </el-date-picker>
            </el-form-item>
        </common-el-form>
    </div>
</template>

<script>
    import CommonElForm from 'components/common/CommonElForm'
    import ChooseAddress from 'components/business/ChooseAddress'
    import OrganService from 'service/OrganService'
    import privateKey from 'service/constant/privateKey'
    import {encrypt, urlEncode, objKeySort} from "common/js/common-utils";
    import {loadMixin, validatorsMixin} from "mixin";
    import {mapState} from 'vuex'

    export default {
        name: "AddOrganManage",
        data() {
            return {
                formRules: {
                    tatName: [{
                        required: true,
                        message: '请输入机构名称'
                    },],
                    appName: [{
                        required: true,
                        message: '请输入应用名称'
                    },],
                    tatSimpleName: [{
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请输入机构简称'))
                            } else if (this.checkSimpleNamesOnly) {
                                callback(new Error('机构简称不能重复'))
                            } else {
                                callback()
                            }
                        },
                    },],
                    connPerson: [{
                        required: true,
                        message: '请输入联系人'
                    },],
                    connTel: [{
                        required: true,
                        validator: this.validPhone,
                        trigger: ['blur', 'change']
                    }],
                    email: [{
                        required: false,
                        validator: this.validEmail,
                        trigger: ['blur', 'change']
                    }],
                    tatAbbr: [{
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请输入机构缩写'))
                            } else if (this.checkAbbrsOnly) {
                                callback(new Error('机构缩写不能重复'))
                            } else {
                                callback()
                            }
                        },
                    },],
                },
                formModel: {
                    tatName: '',
                    appName: '',
                    tatSimpleName: '',
                    connPerson: '',
                    connTel: '',
                    email: '',
                    address: '',
                    priKey: '',
                    tatAbbr: '',
                    validStart: '合同开始日期',
                    validEnd: '合同结束日期',
                },
                tatSimpleNames: [],
                getTatSimpleName:'',
                getTatAbbr:'',
                abbrs: [],
                organID: '',
                time: [],
                regionCode: '',
                // province:'',
                // city:'',
                // area:''
            }
        },
        mixins: [loadMixin, validatorsMixin],
        components: {
            CommonElForm, ChooseAddress
        },
        mounted() {
            this.organID = this.$route.params.id;
            if (this.organID) {
                this.getInfo();
            }
            this.getSimpleNames();
            this.getAbbrs();
        },
        computed: {
            checkSimpleNamesOnly() {
                for (let i = 0; i < this.tatSimpleNames.length; i++) {
                    if (this.formModel.tatSimpleName == this.tatSimpleNames[i].simpleName) {

                        if (this.getTatSimpleName == this.tatSimpleNames[i].simpleName) {
                            return false;
                        }
                        return true;
                    } else {
                        if ( i== this.tatSimpleNames.length-1 ) {
                            return false;
                        }
                    }
                }
            },
            checkAbbrsOnly() {
                for (let i = 0; i < this.abbrs.length; i++) {
                    if (this.formModel.tatAbbr == this.abbrs[i].tatAbbr) {
                        if (this.getTatAbbr == this.abbrs[i].tatAbbr) {
                            return false;
                        }
                        return true;
                    } else {
                        if ( i== this.abbrs.length-1 ) {
                            return false;
                        }
                    }
                }
            },
            submitService() {
                if (this.organID) {
                    return OrganService.update
                } else {
                    return OrganService.add
                }
            },
            submitData() {
                this.params = {
                    serverType:this.serverType,
                    tatId: this.tatId,
                    tatName: this.formModel.tatName,
                    appName: this.formModel.appName,
                    tatSimpleName: this.formModel.tatSimpleName,
                    connPerson: this.formModel.connPerson,
                    connTel: this.formModel.connTel,
                    email: this.formModel.email,
                    address: this.formModel.address,
                    regionCode: this.regionCode,
                    province:this.formModel.province,
                    city:this.formModel.city,
                    area:this.formModel.area,
                    tatAbbr: this.formModel.tatAbbr,
                    validStart: this.time[0],
                    validEnd: this.time[1],
                    userId: this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                if (this.time.length == 0) {
                    delete this.params.validStart;
                    delete this.params.validEnd;
                }
                if(this.organID){
                    this.params.id = this.organID;
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
            ...mapState(['serverType','tatId', 'userId'])
        },
        methods: {
            getRegionCode(regionCode,province,city,area) {
                this.regionCode = regionCode;
                this.formModel.province = province;
                this.formModel.city = city;
                this.formModel.area = area;
            },
            getInfo() {
                const params = {
                    serverType:this.serverType,
                    tatId: this.tatId,
                    id: this.organID,
                    userId: this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                params.sign = encrypt(urlEncode(objKeySort(params)) + '&priKey=' + privateKey.priKey);

                this.doLoad(OrganService.detail, params, res => {
                    this.doCheck(res, res => {
                        let result = JSON.parse(res.contents);
                        this.formModel = result;

                        this.time[0] = this.formModel.validStart;
                        this.time[1] = this.formModel.validEnd;
                        this.regionCode = this.formModel.regionCode;

                        this.getTatSimpleName = this.formModel.tatSimpleName;
                        this.getTatAbbr = this.formModel.tatAbbr;
                    });
                }, '信息获取失败')
            },
            getSimpleNames() {
                this.doLoad(OrganService.simpleNames, this.commonParams, res => {
                    this.doCheck(res, res => {
                        this.tatSimpleNames = JSON.parse(res.contents);
                    });
                }, '信息获取失败')
            },
            getAbbrs() {
                this.doLoad(OrganService.abbrs, this.commonParams, res => {
                    this.doCheck(res, res => {
                        this.abbrs = JSON.parse(res.contents);
                    });
                }, '信息获取失败')
            },
            onSuccess(res) {
                if (res.respCode == '0000') {
                    this.showSuccess(res.respMsg);
                    this.$router.replace({
                        name: 'organmanage'
                    });
                } else {
                    this.showError(res.respMsg);
                }
            },
            onCancel() {
                this.$router.back();
            },
        }
    }
</script>

<style scoped>
    .el-form-item {
        display: flex;
        margin-right: 20px;
    }
</style>
