<template>
    <div class="card-container">
        <common-el-form :model="model" :rules="rules" :submitData="submitData" @success="onSuccess"
                        @cancel="onCancel" submit-btn-text="提交" failTitle="提交失败" loadingText="提交中..."
                        :submitService="submitService" labelWidth="110px">
            <el-form-item label="通道简称" prop="shortName">
                <el-input v-model="model.shortName" placeholder="请输入通道简称" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="支付类型" prop="payTypeId">
                <el-select v-model="model.payTypeId" style="width: 300px">
                    <el-option
                        v-for="item in payTypes"
                        :key="item.dictKey"
                        :label="item.dictValue"
                        :value="item.dictKey">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="结算类型" prop="settleTypeId">
                <el-select v-model="model.settleTypeId" style="width: 300px">
                    <el-option
                        v-for="item in settleTypes"
                        :key="item.dictKey"
                        :label="item.dictValue"
                        :value="item.dictKey">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手续费类型" prop="feeTypeId">
                <el-select v-model="model.feeTypeId" style="width: 300px">
                    <el-option
                        v-for="item in feeTypes"
                        :key="item.dictKey"
                        :label="item.dictValue"
                        :value="item.dictKey">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="计费标准" prop="feeCount">
                <div class="flex-row">
                    <el-input-number v-model="model.feeCount" controls-position="right" :precision="2" :step="0.1"
                                     :min="0" style="width: 300px"></el-input-number>
                    <span class="formSpan">{{model.feeTypeId == 1 ? '%':'元'}}</span>
                </div>
            </el-form-item>
            <!--<p class="commonTitle">交易配置</p>-->
            <el-row>
                <el-form-item label="单笔交易最小额" prop="singleMinAmt">
                    <div class="flex-row">
                        <el-input-number controls-position="right" :precision="2" :step="0.1" :min="0"
                                         v-model="model.singleMinAmt" style="width: 300px"></el-input-number>
                        <span class="formSpan">元/笔</span>
                    </div>
                </el-form-item>
                <el-form-item label="单笔交易最大额" prop="singleMaxAmt">
                    <div class="flex-row">
                        <el-input-number controls-position="right" :precision="2" :step="0.1" :min="0"
                                         v-model="model.singleMaxAmt" style="width: 300px"></el-input-number>
                        <span class="formSpan">元/笔</span>
                    </div>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="单日累计金额" prop="dayTotalAmt">
                    <div class="flex-row">
                        <el-input-number controls-position="right" :precision="2" :step="0.1" :min="0"
                                         v-model="model.dayTotalAmt" style="width: 300px"></el-input-number>
                        <span class="formSpan">元</span>
                    </div>
                </el-form-item>
                <el-form-item label="单日累计笔数" prop="dayTotalCount">
                    <div class="flex-row">
                        <el-input-number controls-position="right" :min="0" v-model="model.dayTotalCount"
                                         style="width: 300px"></el-input-number>
                        <span class="formSpan">笔</span>
                    </div>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="交易时间" prop="transaction">
                    <el-time-picker
                        is-range
                        arrow-control
                        v-model="transaction"
                        range-separator="至"
                        value-format="HH:mm:ss"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围">
                    </el-time-picker>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="允许交易日期" prop="allowTranType">
                    <div class="flex-row vertical-center">
                        <el-radio v-model="model.allowTranType" label="0" class="commonMargin">不限</el-radio>
                        <div class="flex-row vertical-center">
                            <el-radio v-model="model.allowTranType" label="1" class="commonMargin">起止</el-radio>
                            <el-date-picker
                                v-model="allowTransaction"
                                :disabled="dateAllow"
                                type="daterange"
                                value-format="yyyy-MM-dd"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </div>
                </el-form-item>
            </el-row>

            <el-form-item label="允许交易周期" prop="tranCycleType">
                <el-radio v-model="model.tranCycleType" label="0" class="commonMargin">不限</el-radio>
                <div class="flex-row vertical-center">
                    <el-radio v-model="model.tranCycleType" label="1" class="commonMargin">指定</el-radio>
                    <el-checkbox-group v-model="model.tranCycleDtl">
                        <el-checkbox :disabled="weekAllow" :label="day.label" v-for="(day,index) in days" :key="index">
                            {{day.label}}
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-form-item>
            <el-row>
                <el-form-item label="需要代付" prop="needRepay">
                    <el-select v-model="model.needRepay" style="width: 300px">
                        <el-option
                            v-for="item in needRepays"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="代付收费类型" prop="repayType">
                    <el-select v-model="model.repayType" :disabled="rePayShow" style="width: 300px">
                        <el-option
                            v-for="item in repayTypes"
                            :key="item.dictKey"
                            :label="item.dictValue"
                            :value="item.dictKey">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="代付收费标准" prop="repayAmt">
                    <div class="flex-row">
                        <el-input-number controls-position="right" :precision="2" :step="0.1" :min="0"
                                         v-model="model.repayAmt" style="width: 300px"
                                         :disabled="rePayShow"></el-input-number>
                        <span class="formSpan">{{model.feeTypeId == 1 ? '%':'元'}}</span>
                    </div>
                </el-form-item>
            </el-row>
        </common-el-form>
    </div>
</template>

<script>
    import CommonElForm from 'components/common/CommonElForm'
    import ChannelRateService from 'service/ChannelRateService'
    import privateKey from 'service/constant/privateKey'
    import {encrypt, urlEncode, objKeySort} from "common/js/common-utils";
    import {loadMixin, dialogMixin, validatorsMixin} from "mixin";
    import {mapState} from 'vuex'

    export default {
        name: "AddRate",
        data() {
            return {
                rules: {
                    shortName: [{
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请输入通道简称'))
                            } else if (this.checkShortNameOnly) {
                                callback(new Error('通道简称不能重复'))
                            } else {
                                callback()
                            }
                        },
                    },],
                    payTypeId: [{
                        required: true,
                        message: '请选择支付类型'
                    },],
                    settleTypeId: [{
                        required: true,
                        message: '请选择结算类型'
                    },],
                    feeTypeId: [{
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请选择收学费类型'))
                            } else if (value == 1) {
                                if (this.model.feeCount >= 1) {
                                    callback(new Error('计费标准不能大于或等于1'))
                                } else {
                                    callback();
                                }
                            } else {
                                callback();
                            }
                        },
                    },],
                    feeCount: [{
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请输入计费标准'))
                            } else if (value >= 1) {
                                if (this.model.feeTypeId == 1) {
                                    callback(new Error('计费标准不能大于或等于1'))
                                } else {
                                    callback();
                                }
                            } else {
                                callback();
                            }
                        },
                    },],
                    needRepay: [{
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请选择是否需要代付'))
                            } else if (value == '0') {
                                this.rePayShow = false;
                                callback();
                            } else {
                                this.rePayShow = true;
                                callback();
                            }
                        },
                    },],

                },
                rePayShow: false,
                model: {
                    shortName: '',
                    chnId: '',
                    payTypeId: '',
                    settleTypeId: '',
                    feeTypeId: '',
                    feeCount: '',
                    allowTranType: '0',
                    tranCycleType: '0',
                    tranCycleDtl: [],
                    needRepay: '',
                    repayType: '',
                    repayAmt: '',
                    singleMinAmt: '',
                    singleMaxAmt: '',
                    dayTotalAmt: '',
                    dayTotalCount: '',
                },
                transaction: [],
                allowTransaction: [],
                days: [
                    {
                        value: '1',
                        label: '周一'
                    },
                    {
                        value: '2',
                        label: '周二'
                    },
                    {
                        value: '3',
                        label: '周三'
                    },
                    {
                        value: '4',
                        label: '周四'
                    },
                    {
                        value: '5',
                        label: '周五'
                    },
                    {
                        value: '6',
                        label: '周六'
                    },
                    {
                        value: '7',
                        label: '周七'
                    },
                ],
                shortNames: [],
                payTypes: [],
                settleTypes: [],
                feeTypes: [],
                repayTypes: [],
                needRepays: [{
                    value: '0',
                    label: '需要'
                }, {
                    value: '1',
                    label: '不需要'
                }],
                dateAllow: true,
                weekAllow: true,
                rateId: '',
                chnId: '',
                getShortName: '',
                params: {},
            }
        },
        mixins: [loadMixin, dialogMixin, validatorsMixin],
        components: {
            CommonElForm,
        },
        mounted() {
            this.getTypeNames('payType', (res) => {
                this.payTypes = res;
            });
            this.getTypeNames('settleType', (res) => {
                this.settleTypes = res;
            });
            this.getTypeNames('feeType', (res) => {
                this.feeTypes = res;
            });
            this.getTypeNames('repayType', (res) => {
                this.repayTypes = res;
            });
            this.getShortNames();

            this.rateId = this.$route.params.id;
            this.chnId = this.$route.params.chnId;

            console.log('rateIds',this.rateId)

            if (this.rateId != undefined) {
                this.getDetail();
            }
            // else{
            //     this.model = {};
            // }

        },
        computed: {
            checkShortNameOnly() {
                for (let i = 0; i < this.shortNames.length; i++) {
                    if (this.model.shortName == this.shortNames[i].shortName) {
                        if (this.getShortName == this.shortNames[i].shortName) {
                            return false;
                        }
                        return true;
                    } else {
                        if (i == this.shortNames.length - 1) {
                            return false;
                        }
                    }
                }
            },
            submitData() {
                this.params = {
                    serverType: this.serverType,
                    tatId: this.tatId,
                    chnId: this.chnId,
                    shortName: this.model.shortName,
                    payTypeId: this.model.payTypeId,
                    settleTypeId: this.model.settleTypeId,
                    feeTypeId: this.model.feeTypeId,
                    feeCount: this.model.feeCount,
                    singleMinAmt: this.model.singleMinAmt,
                    singleMaxAmt: this.model.singleMaxAmt,
                    dayTotalAmt: this.model.dayTotalAmt,
                    dayTotalCount: this.model.dayTotalCount,
                    tranStartTime: this.transaction[0],
                    tranEndTime: this.transaction[1],
                    allowTranType: this.model.allowTranType,
                    allowStartDate: this.allowTransaction[0],
                    allowEndDate: this.allowTransaction[1],
                    tranCycleType: this.model.tranCycleType,
                    tranCycleDtl: this.model.tranCycleDtl,
                    needRepay: this.model.needRepay,
                    repayType: this.model.repayType,
                    repayAmt: this.model.repayAmt,
                    userId: this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };

                if (this.transaction.length == 0) {
                    delete this.params.tranStartTime;
                    delete this.params.tranEndTime;
                }
                if (this.allowTransaction.length == 0) {
                    delete this.params.allowStartDate;
                    delete this.params.allowEndDate;
                }
                if (this.rateId) {
                    this.params.id = this.rateId;
                }
                this.params.sign = encrypt(urlEncode(objKeySort(this.params)) + '&priKey=' + privateKey.priKey);
                return this.params;
            },
            submitService() {
                if (this.rateId) {
                    return ChannelRateService.update;
                } else {
                    return ChannelRateService.add;
                }
            },
            commonParams() {
                const params = {
                    serverType: this.serverType,
                    tatId: this.tatId,
                    // userId:this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                params.sign = encrypt(urlEncode(objKeySort(params)) + '&priKey=' + privateKey.priKey);
                return params;
            },
            ...mapState(['serverType', 'tatId', 'userId'])
        },
        watch: {
            'model.allowTranType'(val) {
                if (val == 1) {
                    this.dateAllow = false;
                } else {
                    this.dateAllow = true;
                }
            },
            'model.tranCycleType'(val) {
                if (val == 1) {
                    this.weekAllow = false;
                } else {
                    this.weekAllow = true;
                }
            },
        },
        methods: {
            getDetail() {
                const params = {
                    serverType: this.serverType,
                    tatId: this.tatId,
                    id: this.rateId,
                    userId: this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                params.sign = encrypt(urlEncode(objKeySort(params)) + '&priKey=' + privateKey.priKey);

                this.doLoad(ChannelRateService.detail, params, res => {
                    this.doCheck(res, res => {
                        let result = JSON.parse(res.contents);
                        console.log(result)
                        this.model = result;

                        this.getShortName = this.model.shortName;
                        this.model.tranCycleDtl = this.model.tranCycleDtl.split(',');
                        this.model.tranCycleType = this.model.tranCycleType.toString();
                        this.model.allowTranType = this.model.allowTranType.toString();
                        this.model.needRepay = this.model.needRepay.toString();

                        this.model.feeCount = this.model.feeCount / 100;
                        this.model.singleMaxAmt = this.model.singleMaxAmt / 100;
                        this.model.singleMinAmt = this.model.singleMinAmt / 100;
                        this.model.repayAmt = this.model.repayAmt / 100;

                        this.transaction.push(this.model.tranStartTime,this.model.tranEndTime);
                        this.allowTransaction.push(this.model.allowStartDate,this.model.allowEndDate);

                    });
                }, '信息获取失败')
            },
            onSuccess(res) {
                if (res.respCode == '0000') {
                    this.showSuccess(res.respMsg);
                    this.$router.back();
                } else {
                    this.showError(res.respMsg);
                }
            },
            onCancel() {
                this.$router.back();
            },
            getShortNames() {
                this.doLoad(ChannelRateService.shortNames, this.commonParams, res => {
                    this.doCheck(res, res => {
                        this.shortNames = JSON.parse(res.contents);
                    });
                }, '信息获取失败')
            }
        }
    }
</script>

<style scoped>
    .el-form-item {
        display: flex;
        margin-right: 20px;
    }
</style>
