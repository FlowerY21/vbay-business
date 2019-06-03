<template>
    <div class="card-container">
        <common-top-form :model="formModel" @openAddDialog="addInfo" :submitService="submitService" :submitData="submitData" @success="onSuccess">
            <el-form-item label="机构名称" prop="name">
                <el-input v-model="formModel.name" placeholder="请输入机构名称"></el-input>
            </el-form-item>
            <el-form-item label="机构状态" prop="status">
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
        <common-table :data="tableData" ref="commonTable" @handleChange="getList">
            <el-table-column prop="tatName" label="机构名称" width="160"></el-table-column>
            <el-table-column prop="appName" label="应用名称" width="160"></el-table-column>
            <el-table-column prop="status" label="机构状态">
                <template slot-scope="scope">
                    <p>{{scope.row.status == 0 ? '禁用' : '启用'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="connPerson" label="联系人"></el-table-column>
            <el-table-column prop="connTel" label="联系电话"width="160"></el-table-column>
            <el-table-column prop="region" label="所属区域"width="260">
                <template slot-scope="scope">
                    {{scope.row.province}} {{scope.row.city}} {{scope.row.area}}
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="创建时间"width="160"></el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="text" @click="updateInfo(scope.row.id)">修改</el-button>
                    <el-button  type="text" @click="Disabled(scope.row.id,scope.row.status)" class="button-color">{{scope.row.status == 1 ? '禁用' : '启用'}}</el-button>
                </template>
            </el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'
    import OrganService from 'service/OrganService'
    import privateKey from 'service/constant/privateKey'
    import {encrypt, urlEncode, objKeySort} from "common/js/common-utils";
    import {loadMixin,dialogMixin} from "mixin";
    import {mapState} from 'vuex'
    export default {
        name: "ChannelManage",
        data() {
            return {
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
                formModel:{
                    name:'',
                    status:'',
                },
                tableData:[],
                submitService:OrganService.list,
                page:{},
                params:{},
                textShow:false,
                status:'',
                showMsg:'',
            }
        },
        mixins:[loadMixin,dialogMixin],
        components: {
            CommonTopForm ,
            CommonTable,
        },
        mounted(){
            this.page = this.$refs.commonTable.page;
            this.getList();
        },
        computed: {
            submitData() {
                this.params = {
                    serverType:this.serverType,
                    tatId: this.tatId,
                    tatName: this.formModel.name,
                    tatStatus: this.formModel.status,
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
                this.doLoad(OrganService.list,this.submitData,res => {
                    this.doCheck(res,res =>{
                        const result = JSON.parse(res.contents);
                        this.tableData = result.rows;

                        this.page.currentPage = result.current;
                        this.page.total = result.total;
                        this.page.pageSize = result.size;
                    });
                },'信息获取失败')
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
            addInfo() {
                this.$router.push({
                    name:'addorganmanage',
                })
            },
            updateInfo(id) {
                this.$router.push({
                    name:'updateorganmanage',
                    params:{
                        id:id
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
                this.doLoad(OrganService.prohibit,disabledParams,res => {
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
                    this.showMsg = '确定启用此机构？'
                }else if (type == 1) {
                    this.status = 0;
                    this.showMsg = '确定禁用此机构？'
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
