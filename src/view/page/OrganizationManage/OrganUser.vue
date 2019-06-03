<template>
    <div class="card-container">
        <common-top-form :model="formModel" @openAddDialog="addInfo()" :show="false">
            <el-row>
                <el-form-item label="商户ID">
                    <el-input v-model="formModel.MerchantID" placeholder="请输入商户ID"></el-input>
                </el-form-item>
                <el-form-item label="商户手机号">
                    <el-input v-model="formModel.phone" placeholder="请输入商户手机号"></el-input>
                </el-form-item>
                <el-form-item label="商户姓名">
                    <el-input v-model="formModel.name" placeholder="请输入商户姓名："></el-input>
                </el-form-item>
            </el-row>
            <el-form-item label="所属机构">
                <el-select v-model="formModel.state">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="注册时间">
                <el-date-picker
                    v-model="formModel.registerTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
        </common-top-form>
        <common-table :data="tableData">
            <el-table-column prop="MerchantID" label="商户ID" width="160"></el-table-column>
            <el-table-column prop="name" label="商户名" width="160"></el-table-column>
            <el-table-column prop="phone" label="商户手机号" width="160"></el-table-column>
            <el-table-column prop="user" label="法人姓名"></el-table-column>
            <el-table-column prop="apply" label="所属应用" width="160"></el-table-column>
            <el-table-column prop="createTime" label="注册时间" width="160"></el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="text" @click="updateInfo(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </common-table>
        <show-info-dialog title="商户详情" ref="showInfoDialog"></show-info-dialog>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'
    import ShowInfoDialog from '../../dialog/ShowInfoDialog'

    export default {
        name: "OrganUser",
        data() {
            return {
                options: [{
                    value: '0',
                    label: '全部'
                }, {
                    value: '1',
                    label: '黄金糕'
                }, {
                    value: '2',
                    label: '双皮奶'
                }, {
                    value: '3',
                    label: '蚵仔煎'
                }, {
                    value: '4',
                    label: '龙须面'
                }, {
                    value: '5',
                    label: '北京烤鸭'
                }],
                formModel: {
                    MerchantID: '',
                    phone: '',
                    name: '',
                    state: '',
                    registerTime: ''
                },
                dialogModel: {
                    name: '',
                    applyName: '',
                    phone: '',
                    email: '',
                    address: '',
                    area: '',
                    jgsx: '',
                    state: '',
                    createTime: '',
                    endTime: '',
                },
                tableData: [{
                    MerchantID: '00031742',
                    name: '个体张三丰',
                    phone: '13899998888',
                    user: '张三',
                    apply: '还款赢  ',
                    createTime: '2019-10-10 12:12:12',
                }, {
                    MerchantID: '00031742',
                    name: '个体张三丰',
                    phone: '13899998888',
                    user: '张三',
                    apply: '还款赢  ',
                    createTime: '2019-10-10 12:12:12',
                }, {
                    MerchantID: '00031742',
                    name: '个体张三丰',
                    phone: '13899998888',
                    user: '张三',
                    apply: '还款赢  ',
                    createTime: '2019-10-10 12:12:12',
                },],
            }
        },
        components: {
            CommonTopForm,
            CommonTable,
            ShowInfoDialog
        },
        methods: {
            updateInfo() {
                this.$refs.showInfoDialog.open();
            }
        }
    }
</script>

<style scoped>

</style>
