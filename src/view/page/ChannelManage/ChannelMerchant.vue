<template>
    <div class="card-container">
        <common-top-form :model="formModel"  :buttonShow="true" :show="false">
            <el-row>
                <el-form-item label="商户名称">
                    <el-input v-model="formModel.name" placeholder="请输入通道简称"></el-input>
                </el-form-item>
                <el-form-item label="所属行业">
                    <el-select v-model="formModel.industry">
                        <el-option
                            v-for="item in industrys"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属机构">
                    <el-select v-model="formModel.Affiliate">
                        <el-option
                            v-for="item in Affiliates"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-row>
                <el-form-item label="所在城市">
                    <el-select v-model="formModel.city">
                        <el-option
                            v-for="item in citys"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商户状态">
                    <el-select v-model="formModel.state">
                        <el-option
                            v-for="item in states"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
        </common-top-form>
        <common-table :data="tableData">
            <el-table-column prop="name" label="商户名称" width="160"></el-table-column>
            <el-table-column prop="type" label="经营类型" width="160"></el-table-column>
            <el-table-column prop="city" label="所在城市"></el-table-column>
            <el-table-column prop="state" label="商户状态"></el-table-column>
            <el-table-column prop="Affiliate" label="所属机构" width="160"></el-table-column>
            <el-table-column prop="max" label="单日最大额度"></el-table-column>
            <el-table-column prop="surplus" label="单日剩余额度"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button type="text" class="button-color">停用</el-button>
                </template>
            </el-table-column>
        </common-table>
        <form-dialog ref="formDialog" :formDialogTitle="formDialogTitle" :model="dialogModel" class="dialog">

        </form-dialog>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'
    import FormDialog from '../../dialog/FormDialog'
    import ElFormItem from "element-ui/packages/form/src/form-item";

    export default {
        name: "ChannelMerchant",
        data() {
            return {
                channelNames: [{
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
                industrys: [{
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
                Affiliates: [{
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
                citys: [{
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
                states: [{
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
                    name:'',
                    industry:'',
                    Affiliate:'',
                    city:'',
                    state:'',
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
                    name: '宝视达眼镜店',
                    type: '零售',
                    city: '沈阳',
                    state: '启用',
                    Affiliate: '机构共享',
                    max: '无限额',
                    surplus: '无限额',
                    createTime: '2019-04-11 09:00:01',
                }],
                formDialogTitle: ''
            }
        },
        components: {
            ElFormItem,
            CommonTopForm,
            CommonTable,
            FormDialog
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
