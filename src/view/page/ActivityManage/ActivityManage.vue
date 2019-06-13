<template>
    <div class="common-container">
        <common-gray-form placeholder="名称/描述" @add="changeActivity"></common-gray-form>
        <common-table :data="tableData" ref="commonTable" :multipleSelection="multipleSelection">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="封面图片">
                <template slot-scope="scope">
                    <div class="coverImg" style="background: url('../../../assets/images/login.png') center/cover no-repeat"></div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="address" label="创建时间" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="address" label="活动开始时间" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="address" label="报名人数" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="address" label="状态" show-overflow-tooltip> </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="changeActivity(scope.row.id)">编辑</el-button>
                    <el-button type="text">活动管理</el-button>
                    <el-button type="text">删除</el-button>
                </template>
            </el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonGrayForm from 'components/common/CommonGrayForm'
    import CommonTable from 'components/common/CommonTable'

    export default {
        name: "ActivityManage",
        data(){
            return{
                tableData: [],
                multipleSelection: []
            }
        },
        components:{
            CommonGrayForm,
            CommonTable
        },
        methods:{
            changeActivity(id){
                if (id) {
                    this.$router.push({
                        name:'updateactivity'
                    })
                } else {
                    this.$router.push({
                        name:'addActivity'
                    })
                }
            },
        }
    }
</script>

<style scoped>
    .coverImg{
        width: 110px;
        height: 80px;
    }
</style>
