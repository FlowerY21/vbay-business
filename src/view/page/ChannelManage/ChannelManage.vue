<template>
    <div class="card-container">
        <common-top-form :model="formModel" @openAddDialog="addInfo()" :submitService="submitService"
                         :submitData="submitData" @success="onSuccess">
            <el-row>
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
                <el-form-item label="交易类型">
                    <el-select v-model="formModel.payType">
                        <el-option
                            v-for="item in payTypes"
                            :key="item.dictKey"
                            :label="item.dictValue"
                            :value="item.dictKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="结算类型">
                    <el-select v-model="formModel.settleType">
                        <el-option
                            v-for="item in settleTypes"
                            :key="item.dictKey"
                            :label="item.dictValue"
                            :value="item.dictKey">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-form-item label="通道名称">
                <el-select v-model="formModel.chnId">
                    <el-option
                        v-for="item in topchnNameList"
                        :key="item.id"
                        :label="item.chnName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="计费方式">
                <el-select v-model="formModel.feeType">
                    <el-option
                        v-for="item in feeTypes"
                        :key="item.dictKey"
                        :label="item.dictValue"
                        :value="item.dictKey">
                    </el-option>
                </el-select>
            </el-form-item>
        </common-top-form>
        <common-table :data="tableData">
            <!--<el-table-column prop="name" label="机构名称" width="160"></el-table-column>-->
            <!--<el-table-column prop="applyName" label="应用名称" width="160"></el-table-column>-->
            <el-table-column prop="tatSimpleId" label="机构简称" width="160"></el-table-column>
            <el-table-column prop="chnId" label="通道简称"></el-table-column>
            <!--<el-table-column prop="channelName" label="通道名称"></el-table-column>-->
            <el-table-column prop="status" label="状态" width="160">
                <template slot-scope="scope">
                    <p>{{scope.row.status == 0 ? '禁用' : '启用'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="payType" label="支付类型"></el-table-column>
            <el-table-column prop="feeType" label="计费方式"></el-table-column>
            <el-table-column prop="feeAmt" label="费率">
                <template slot-scope="scope">
                    {{scope.row.feeAmt / 100}}
                    <!--{{scope.row.feeAmt}}-->
                </template>
            </el-table-column>
            <!--<el-table-column prop="change" label="修改人"></el-table-column>-->
            <!--<el-table-column prop="changeTime" label="修改时间" width="160"></el-table-column>-->
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="text" @click="updateInfo(scope.row.id)">修改</el-button>
                    <el-button type="text" @click="Disabled(scope.row.id,scope.row.status)" class="button-color">
                        {{scope.row.status == 1 ? '禁用' : '启用'}}
                    </el-button>
                </template>
            </el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'
    import ElFormItem from "element-ui/packages/form/src/form-item";

    import OrganService from 'service/OrganService'
    import ChannelService from 'service/ChannelService'
    import OrganRateService from 'service/OrganRateService'
    import privateKey from 'service/constant/privateKey'
    import {encrypt, urlEncode, objKeySort} from "common/js/common-utils";
    import {loadMixin, dialogMixin, validatorsMixin} from "mixin";
    import {mapState} from 'vuex'


    export default {
        name: "OrganRate",
        data() {
            return {
                all: [{
                    id: '',
                    simpleName: '全部'
                }],
                all2: [{
                    dictKey: '',
                    dictValue: '全部'
                }],
                allChnName: [{
                    id: '',
                    chnName: '全部'
                }],
                topTatSimpleNames: [],
                payTypes: [],
                feeTypes: [],
                settleTypes: [],
                Settlements: [],
                chnNameList: [],
                topchnNameList: [],
                formModel: {
                    tatSimpleId: '',
                    chnId: '',
                    payType: '',
                    settleType: '',
                    feeType: '',
                },
                tableData: [],
                submitService:OrganRateService.list,
                params:{},

            }
        },
        mixins: [loadMixin, dialogMixin, validatorsMixin],
        components: {
            ElFormItem,
            CommonTopForm,
            CommonTable,
        },
        mounted() {
            this.getSimpleNames();
            this.getchnNameList();

            this.getTypeNames('feeType', (res) => {
                this.feeTypes = [...this.all2, ...res];
            });

            this.getTypeNames('settleType', (res) => {
                this.settleTypes = [...this.all2, ...res];
            });

            this.getTypeNames('payType', (res) => {
                this.payTypes = [...this.all2, ...res];
            });

            this.getList();
        },
        computed: {
            submitData(){
                this.params = {
                    serverType: this.serverType,
                    tatId: this.tatId,
                    tatSimpleId: this.formModel.tatSimpleId,
                    chnId: this.formModel.chnId,
                    payType: this.formModel.payType,
                    settleType: this.formModel.settleType,
                    feeType: this.formModel.feeType,
                    userId: this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                this.params.sign = encrypt(urlEncode(objKeySort(this.params)) + '&priKey=' + privateKey.priKey);
                return this.params;
            },
            commonParams() {
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
        methods: {
            getSimpleNames() {
                this.doLoad(OrganService.simpleNames, this.commonParams, res => {
                    this.doCheck(res, res => {
                        this.tatSimpleNames = JSON.parse(res.contents);
                        this.topTatSimpleNames = [...this.all, ...JSON.parse(res.contents)];
                    });
                }, '信息获取失败')
            },
            getchnNameList() {
                this.doLoad(ChannelService.names, this.commonParams, res => {
                    this.doCheck(res, res => {
                        this.chnNameList = JSON.parse(res.contents);
                        this.topchnNameList = [...this.allChnName, ...JSON.parse(res.contents)];
                    });
                }, '信息获取失败')
            },
            addInfo() {
                this.$router.push({
                    name:'addchannelmanage'
                })
            },
            updateInfo(id) {
                this.$router.push({
                    name:'updatechannelmanage',
                    params:{
                        id:id,
                    }
                })
            },
            getList() {
                this.doLoad(OrganRateService.list, this.submitData, res => {
                    this.doCheck(res, res => {
                        const result = JSON.parse(res.contents);
                        this.tableData = result.rows;
                        console.log('res',this.tableData)
                    });
                }, '信息获取失败')
            },
            onSuccess(data) {
                this.doCheck(data, res => {
                    const result = JSON.parse(res.contents);
                    this.tableData = result.rows;
                    console.log('result',this.tableData)
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
                this.doLoad(OrganRateService.dpstatus, disabledParams, res => {
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
                    this.showMsg = '确定启用此机构费率？'
                } else if (type == 1) {
                    this.status = 0;
                    this.showMsg = '确定禁用此机构费率？'
                }
                this.showConfirm(this.showMsg).then(() => {
                    this.doDisabled(id)
                }).catch(() => {
                });
            },
        }
    }
</script>

<style scoped>

</style>
