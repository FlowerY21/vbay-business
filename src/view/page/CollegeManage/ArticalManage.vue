<template>
    <div class="card-container">
        <common-top-form :model="formModel" @openAddDialog="addInfo()"
                         :submitData="submitData" @success="onSuccess">
            <el-form-item label="标题名称">
               <el-input v-model="formModel.titleName" placeholder="请输入标题名称"></el-input>
            </el-form-item>
            <el-form-item label="发布日期" prop="transaction">
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
            <el-form-item label="发布人">
               <el-input v-model="formModel.member" placeholder="请输入发布人"></el-input>
            </el-form-item>
        </common-top-form>
        <common-table :data="tableData">
            <el-table-column prop="tatSimpleId" label="标题名称"></el-table-column>
            <el-table-column prop="tatSimpleId" label="文章类型"></el-table-column>
            <el-table-column prop="tatSimpleId" label="发布人"></el-table-column>
            <el-table-column prop="tatSimpleId" label="发布时间"></el-table-column>
            <el-table-column prop="status" label="状态" width="160">
                <template slot-scope="scope">
                    <p>{{scope.row.status == 0 ? '禁用' : '启用'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="tatSimpleId" label="是否热点"></el-table-column>
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
    export default {
        name: "ArticalManage",
        components: {
            CommonTopForm,
            CommonTable,
        },
        data(){
            return{
                formModel:{
                    titleName:'',
                    member:'',
                },
                transaction:['',''],
                tableData:[],
            }
        },
        computed:{
            submitData(){

            }
        },
        methods:{
            onSuccess(){

            },
            addInfo(){
                this.$router.push({
                    name:'addartical'
                })
            },
            updateInfo(id){
                this.$router.push({
                    name:'updateartical',
                    params:{
                        id:id
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
