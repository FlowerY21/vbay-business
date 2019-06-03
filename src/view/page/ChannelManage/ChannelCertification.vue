<template>
    <div class="card-container">
        <common-top-form :model="formModel" @openAddDialog="addInfo()" :submitService="submitService" :submitData="submitData" @success="onSuccess">
            <el-form-item label="简称">
                <el-input v-model="formModel.shortName" placeholder="请输入机构名称"></el-input>
            </el-form-item>
            <el-form-item label="通道名称">
                <el-input v-model="formModel.authChnName" placeholder="请输入联系人"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="formModel.status">
                    <el-option
                        v-for="item in states"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </common-top-form>
        <common-table :data="tableData":isShow="false">
            <el-table-column prop="shortName" label="认证简称" width="160"></el-table-column>
            <el-table-column prop="authChnName" label="认证通道名称" width="160"></el-table-column>
            <el-table-column prop="connPerson" label="联系人" width="160"></el-table-column>
            <el-table-column prop="connTel" label="联系电话"></el-table-column>
            <el-table-column prop="status" label="状态" width="160">
                <template slot-scope="scope">
                    <p>{{scope.row.status == 0 ? '禁用' : '启用'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="feeAmt" label="计费标准">
                <template slot-scope="scope">
                    <p>{{scope.row.feeAmt/100}}</p>
                </template>
            </el-table-column>
            <!--<el-table-column prop="modifier" label="修改人"></el-table-column>-->
            <el-table-column prop="updateTime" label="修改时间" width="160"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button type="text" @click="updateInfo(scope.row.id)">修改</el-button>
                    <!--<el-button type="text" class="button-color">删除</el-button>-->
                    <el-button  type="text" @click="Disabled(scope.row.id,scope.row.status)" class="button-color">{{scope.row.status == 1 ? '禁用' : '启用'}}</el-button>
                </template>
            </el-table-column>
        </common-table>

    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'
    import ElInput from "element-ui/packages/input/src/input";

    import ChannelAuthService from 'service/ChannelAuthService'
    import privateKey from 'service/constant/privateKey';
    import {encrypt, urlEncode, objKeySort} from "common/js/common-utils";
    import {loadMixin,dialogMixin} from "mixin";
    import {mapState} from 'vuex'

    export default {
        name: "ChannelCertification",
        data(){
            return{
                states: [{
                    value: '',
                    label: '全部'
                },{
                    value: '0',
                    label: '禁用'
                }, {
                    value: '1',
                    label: '启用'
                }],
                formModel:{
                    shortName:'',
                    authChnName:'',
                    status:'',
                },
                tableData:[],
                submitService:ChannelAuthService.list
            }
        },
        mixins:[loadMixin,dialogMixin],
        components:{
            ElInput,
            CommonTopForm ,
            CommonTable,
        },
        computed: {
            submitData() {
                this.params = {
                    serverType:this.serverType,
                    tatId: this.tatId,
                    shortName: this.formModel.shortName,
                    authChnName: this.formModel.authChnName,
                    status: this.formModel.status,
                    userId:this.userId,
                    reqTime: new Date().format("yyyy-MM-dd HH:mm:ss")
                };
                this.params.sign = encrypt(urlEncode(objKeySort(this.params)) + '&priKey=' + privateKey.priKey);
                return this.params;
            },
            ...mapState(['serverType','tatId','userId'])
        },
        mounted(){
            this.getList();
        },
        methods:{
            getList(){
                this.doLoad(ChannelAuthService.list,this.submitData,res => {
                    this.doCheck(res,res =>{
                        const result = JSON.parse(res.contents);
                        this.tableData = result;
                    });
                },'信息获取失败')
            },
            addInfo(){
                this.$router.push({
                    name:'addchannelcommon',
                    params:{
                        type:2
                    }
                })
            },
            updateInfo(id){
                this.$router.push({
                    name:'updatechannelcommon',
                    params:{
                        type:2,
                        id:id
                    }
                })
            },
            onSuccess(data){
                this.doCheck(data,res => {
                    const result = JSON.parse(res.contents);
                    this.tableData = result;
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
                this.doLoad(ChannelAuthService.dpStatus,disabledParams,res => {
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
                    this.showMsg = '确定启用此短信通道？'
                }else if (type == 1) {
                    this.status = 0;
                    this.showMsg = '确定禁用此短信通道？'
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
