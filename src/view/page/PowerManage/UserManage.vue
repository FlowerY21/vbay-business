<template>
    <div class="card-container">
        <common-top-form :model="formModel" @openAddDialog="addInfo()" :submitService="submitService"
                         :submitData="submitData" @success="onSuccess">
            <el-form-item label="账号" prop="userName">
                <el-input v-model="formModel.userName" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phoneNumber">
                <el-input v-model="formModel.phoneNumber" placeholder="请输入电话"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="userStatus">
                <el-select v-model="formModel.userStatus">
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
            <el-table-column prop="userName" label="账号"></el-table-column>
            <el-table-column prop="phoneNumber" label="电话"></el-table-column>
            <el-table-column prop="userStatus" label="状态">
                <template slot-scope="scope">
                    <p>{{scope.row.userStatus == 0 ? '禁用' : '启用'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="updateInfo(scope.row.id)">修改</el-button>
                    <el-button type="text" @click="Delete(scope.row.id)">删除</el-button>
                    <el-button type="text" @click="resizePwd(scope.row.id)" class="button-color">重置密码</el-button>
                </template>
            </el-table-column>
        </common-table>
        <form-dialog ref="formDialog" :formDialogTitle="formDialogTitle" :model="dialogModel"
                     :dialogService="dialogService" :submitData="dialogData" :rules="dialogRules"
                     @success="dialogSuccess" @close="dialogClose" @opend="dialogOpen" class="note">
            <div v-if="dialogServiceType">
                <el-form-item label="密码" prop="passWord">
                    <el-input v-model="dialogModel.passWord" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="rePassWord">
                    <el-input v-model="dialogModel.rePassWord" type="password" placeholder="请输入重复密码"></el-input>
                </el-form-item>
            </div>
            <div v-else>
                <el-form-item label="用户名称" prop="userName">
                    <el-input v-model="dialogModel.userName" placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="phoneNumber">
                    <el-input v-model="dialogModel.phoneNumber" placeholder="请输入电话号码"></el-input>
                </el-form-item>
                <div v-if="!userId">
                    <el-form-item label="真实姓名" prop="realName">
                        <el-input v-model="dialogModel.realName" placeholder="请输入真实姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="passWord">
                        <el-input v-model="dialogModel.passWord" type="password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="重复密码" prop="rePassWord">
                        <el-input v-model="dialogModel.rePassWord" type="password" placeholder="请输入重复密码"></el-input>
                    </el-form-item>
                </div>

                <el-form-item label="状态" prop="userStatus">
                    <el-select v-model="dialogModel.userStatus">
                        <el-option
                            v-for="item in dialogOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色" prop="roleId">
                    <el-select v-model="dialogModel.roleId">
                        <el-option
                            v-for="item in roles"
                            :key="item.id"
                            :label="item.roleName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
        </form-dialog>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'
    import FormDialog from '../../dialog/FormDialog'

    import PowerUserService from 'service/PowerUserService'
    import PowerRoleService from 'service/PowerRoleService'
    import privateKey from 'service/constant/privateKey'
    import {encrypt, urlEncode, objKeySort} from "common/js/common-utils";
    import {loadMixin, dialogMixin, validatorsMixin} from "mixin";
    import {mapGetters} from 'vuex'

    export default {
        name: "UserManage",
        data() {
            return {
                formModel: {
                    userName: '',
                    phoneNumber: '',
                    userStatus: '',
                },
                submitService: PowerUserService.list,
                tableData: [],
                options: [{
                    value: '',
                    label: '全部'
                }, {
                    value: '0',
                    label: '禁用'
                }, {
                    value: '1',
                    label: '启用'
                }],
                dialogOptions: [{
                    value: '0',
                    label: '禁用'
                }, {
                    value: '1',
                    label: '启用'
                }],
                params: {},
                page: {},
                formDialogTitle: '',
                dialogModel: {
                    userName: '',
                    phoneNumber: '',
                    realName: '',
                    passWord: '',
                    rePassWord: '',
                    userStatus: '1',
                    roleId: '',
                },
                dialogRules: {
                    userName: [{
                        required: true,
                        message: '请输入用户名称'
                    }],
                    passWord: [{
                        required: true,
                        message: '请输入密码'
                    }],
                    rePassWord: [{
                        required: true,
                        validator: (rule, value, callback) => {
                            console.log(value)
                            if (!value) {
                                callback(new Error('请输入重复密码'))
                            } else if (value != this.dialogModel.passWord) {
                                callback(new Error('两次密码输入不一致'))
                            } else {
                                callback()
                            }
                        },
                    }],
                    userStatus: [{
                        required: true,
                        message: '请选择用户状态'
                    }],
                    roleId: [{
                        required: true,
                        message: '请选择用户角色'
                    }],
                    phoneNumber: [{
                        required: true,
                        validator: this.validPhone,
                    }],
                },
                roles: [],
                userId: '',
                dialogServiceType:false,
            }
        },
        components: {
            CommonTopForm,
            CommonTable,
            FormDialog,
        },
        mixins: [loadMixin, dialogMixin, validatorsMixin],
        computed: {
            submitData() {
                this.params = {
                    userName: this.formModel.userName,
                    phoneNumber: this.formModel.phoneNumber,
                    userStatus: this.formModel.userStatus,
                    current: this.page.currentPage,
                    size: this.page.pageSize,
                };
                return this.params;
            },
            dialogService() {
                if (this.dialogServiceType) {
                    return PowerUserService.modifypw;
                } else {
                    if (this.userId) {
                        return PowerUserService.update;
                    } else {
                        return PowerUserService.add;
                    }
                }
            },
            dialogData() {
                if (this.dialogServiceType) {
                    const params = {
                        id : this.userId,
                        modifierId : this.userInfo.modifierId,
                        passWord : this.dialogModel.passWord
                    };
                    return params;
                }else {
                    const params = {
                        userName : this.dialogModel.userName,
                        passWord : this.dialogModel.passWord,
                        creatorId : this.userInfo.modifierId,
                        realName : this.dialogModel.realName,
                        userStatus : this.dialogModel.userStatus,
                        roleId : this.dialogModel.roleId,
                        phoneNumber : this.dialogModel.phoneNumber,
                    };
                    if (this.userId) {
                        params.id = this.userId;
                        params.modifierId = this.userInfo.modifierId;

                    }
                    return params;
                }
            },
            ...mapGetters(['userInfo'])
        },
        mounted() {
            this.page = this.$refs.commonTable.page;
            this.getList();
        },
        methods: {
            addInfo() {
                this.dialogServiceType = false;
                this.formDialogTitle = '添加用户';
                this.$refs.formDialog.open();
            },
            updateInfo(id) {
                this.dialogServiceType = false;
                this.userId = id;
                this.getDetail();
                this.formDialogTitle = '修改用户';
                this.$refs.formDialog.open();
            },
            resizePwd(id) {
                this.dialogServiceType = true;
                this.userId = id;
                this.formDialogTitle = '重置密码';
                this.$refs.formDialog.open();
            },
            onSuccess(data) {
                const result = JSON.parse(data.contents);
                this.tableData = result.rows;
                this.page.currentPage = result.current;
                this.page.total = result.total;
                this.page.pageSize = result.size;
            },
            getList() {
                this.doLoad(PowerUserService.list, this.submitData, res => {
                    const result = JSON.parse(res.contents);
                    this.tableData = result.rows;
                    this.page.currentPage = result.current;
                    this.page.total = result.total;
                    this.page.pageSize = result.size;
                }, '信息获取失败')
            },
            Delete(id) {
                this.showMsg = '确定删除该用户？'
                this.showConfirm(this.showMsg).then(() => {
                    this.doDelete(id)
                }).catch(() => {
                });
            },
            doDelete(id) {
                console.log(this.userInfo)
                const delParams = {
                    id: id,
                    modifierId: this.userInfo.modifierId
                };
                this.doLoad(PowerUserService.Delete, delParams, res => {
                    const result = JSON.parse(res.contents);
                    this.showSuccess(result.optMsg);
                    this.getList();
                }, '操作失败')
            },
            dialogSuccess(data) {
                this.showSuccess(data.respMsg);
                this.$refs.formDialog.closeDialog();
                this.getList();
                if (this.dialogServiceType && this.userId == this.userInfo.id) {
                    this.$router.replace({
                        name:'Login'
                    })
                }
            },
            dialogClose() {
                this.dialogModel = {};
            },
            dialogOpen() {
                this.getRoleList();
            },
            getRoleList() {
                this.doLoad(PowerRoleService.selectmenu, '', res => {
                    const result = JSON.parse(res.contents);
                    this.roles = result;
                }, '信息获取失败')
            },
            getDetail() {
                const params = {
                    id : this.userId,
                };
                this.doLoad(PowerUserService.selectone, params, res => {
                    const result = JSON.parse(res.contents);
                    this.dialogModel = result;
                    this.dialogModel.userStatus = this.dialogModel.userStatus.toString();
                }, '信息获取失败')
            }
        }
    }
</script>

<style scoped>

</style>
