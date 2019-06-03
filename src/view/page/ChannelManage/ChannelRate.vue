<template>
    <div class="card-container">
        <common-top-form :model="formModel" @openAddDialog="addInfo" :submitService="submitService" :submitData="submitData" @success="onSuccess">
            <el-row>
                <el-form-item label="通道简称">
                    <el-input v-model="formModel.shortName" placeholder="请输入通道简称"></el-input>
                </el-form-item>
                <!--<el-form-item label="通道名称">-->
                    <!--<el-select v-model="formModel.chnId">-->
                        <!--<el-option-->
                            <!--v-for="item in channelNames"-->
                            <!--:key="item.value"-->
                            <!--:label="item.label"-->
                            <!--:value="item.value">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="支付方式">
                    <el-select v-model="formModel.payTypeId">
                        <el-option
                            v-for="item in payTypes"
                            :key="item.dictKey"
                            :label="item.dictValue"
                            :value="item.dictKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="结算方式">
                    <el-select v-model="formModel.settleTypeId">
                        <el-option
                            v-for="item in settleTypes"
                            :key="item.dictKey"
                            :label="item.dictValue"
                            :value="item.dictKey">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-form-item label="状态">
                <el-select v-model="formModel.status">
                    <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手续费类型">
                <el-select v-model="formModel.feeTypeId">
                    <el-option
                        v-for="item in feeTypes"
                        :key="item.dictKey"
                        :label="item.dictValue"
                        :value="item.dictKey">
                    </el-option>
                </el-select>
            </el-form-item>
        </common-top-form>
        <common-table :data="tableData" ref="commonTable" @handleChange="getList">
            <el-table-column prop="shortName" label="简称" width="160"></el-table-column>
            <!--<el-table-column prop="chnId" label="名称" width="160"></el-table-column>-->
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <p>{{scope.row.status == 0 ? '禁用' : '启用'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="payTypeId" label="支付类型"></el-table-column>
            <el-table-column prop="settleTypeId" label="结算类型"></el-table-column>
            <!--<el-table-column prop="name" label="自动结算"></el-table-column>-->
            <el-table-column prop="feeTypeId" label="手续费类型"></el-table-column>
            <el-table-column prop="feeCount" label="手续费标准">
                <template slot-scope="scope">
                    <p>{{scope.row.feeCount/100}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="needRepay" label="是否代付">
                <template slot-scope="scope">
                    <p>{{scope.row.needRepay == 0 ? '否' : '是'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="repayType" label="代付收费类型"></el-table-column>
            <el-table-column prop="repayAmt" label="收费标准">
                <template slot-scope="scope">
                    <p>{{scope.row.repayAmt/100}}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="text" @click="updateInfo(scope.row.id,scope.row.chnId)">修改</el-button>
                    <el-button  type="text" @click="Disabled(scope.row.id,scope.row.status)" class="button-color">{{scope.row.status == 1 ? '禁用' : '启用'}}</el-button>
                </template>
            </el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'
    import ElFormItem from "element-ui/packages/form/src/form-item";
    import ChannelRateService from 'service/ChannelRateService'
    import privateKey from 'service/constant/privateKey'
    import {encrypt, urlEncode, objKeySort} from "common/js/common-utils";
    import {loadMixin,dialogMixin,validatorsMixin} from "mixin";
    import {mapState} from 'vuex'

    export default {
        name: "ChannelRate",
        data() {
            return {
                all:[{
                    dictKey:'',
                    dictValue:'全部'
                }],
                payTypes: [],
                settleTypes: [],
                statusList: [
                    {
                        value:'',
                        label:'全部'
                    },{
                        value:'0',
                        label:'禁用'
                    },{
                        value:'1',
                        label:'启用'
                    },
                ],
                feeTypes: [],
                formModel: {
                    shortName: '',
                    status: '',
                    chnId: '',
                    payTypeId: '',
                    settleTypeId: '',
                    feeTypeId: '',
                },
                tableData: [],
                submitService:ChannelRateService.list,
                params:{},
                page:{},
            }
        },
        mixins:[loadMixin,dialogMixin,validatorsMixin],
        components: {
            ElFormItem,
            CommonTopForm,
            CommonTable,
        },
        mounted(){
            this.page = this.$refs.commonTable.page;
            this.getTypeNames('payType',(res) => {
                this.payTypes = [...this.all,...res]
            });
            this.getTypeNames('settleType',(res) => {
                this.settleTypes = [...this.all,...res]
            });
            this.getTypeNames('feeType',(res) => {
                this.feeTypes = [...this.all,...res]
            });
            this.getList();
        },
        computed:{
            submitData(){
              this.params = {
                  serverType:this.serverType,
                  tatId:this.tatId,
                  shortName:this.formModel.shortName,
                  status:this.formModel.status,
                  chnId:this.formModel.chnId,
                  payTypeId:this.formModel.payTypeId,
                  settleTypeId:this.formModel.settleTypeId,
                  feeTypeId:this.formModel.feeTypeId,
                  current: this.page.currentPage,
                  size: this.page.pageSize,
                  reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
              };
                this.params.sign = encrypt(urlEncode(objKeySort(this.params)) + '&priKey=' + privateKey.priKey);
                return this.params;
            },
            ...mapState(['serverType','tatId','userId'])
        },
        methods: {
            getList() {
                this.doLoad(ChannelRateService.list,this.submitData,res => {
                    this.doCheck(res,res =>{
                        const result = JSON.parse(res.contents);
                        this.tableData = result.rows;
                        this.page.currentPage = result.current;
                        this.page.total = result.total;
                        this.page.pageSize = result.size;
                    });
                },'信息获取失败')
            },
            addInfo() {
               this.$router.push({
                   name:'addchannelrate'
               })
            },
            onSuccess(data){
                this.doCheck(data,res => {
                    const result = JSON.parse(res.contents);
                    this.tableData = result.rows;
                    this.page.currentPage = result.current;
                    this.page.total = result.total;
                    this.page.pageSize = result.size;
                })
            },
            updateInfo(id,chnId) {
                this.$router.push({
                    name:'updatechannelrate',
                    params:{
                        id:id,
                        chnId:chnId
                    }
                })
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
                this.doLoad(ChannelRateService.dpstatus,disabledParams,res => {
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
                    this.showMsg = '确定启用此通道费率？'
                }else if (type == 1) {
                    this.status = 0;
                    this.showMsg = '确定禁用此通道费率？'
                }
                this.showConfirm(this.showMsg).then(()=>{
                    this.doDisabled(id)
                }).catch(()=>{});
            }
        }
    }
</script>

<style scoped>

</style>
