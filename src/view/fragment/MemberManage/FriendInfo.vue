<template>
    <div>
        <common-table :data="tableData">
            <el-table-column prop="userId" label="用户ID"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
        </common-table>
    </div>
</template>

<script>
    import CommonTable from 'components/common/CommonTable'
    export default {
        name: "FriendInfo",
        data(){
            return{
                tableData:[{
                    userId:'54313',
                    name:'D0',
                    phone:'2019-02-16 15:20:30',
                    role:'26',
                }]
            }
        },
        components: {
            CommonTable
        },
    }
</script>

<style scoped>

</style>
